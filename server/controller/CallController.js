import twilio from "twilio";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const VoiceResponse = twilio.twiml.VoiceResponse;
const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Twilio credentials
const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioApiKeySid = process.env.TWILIO_API_KEY; // Create this in Twilio console
const twilioApiKeySecret = process.env.TWILIO_API_SECRET; // Create this in Twilio console
const twilioTwimlAppSid = process.env.TWILIO_TWIML_APP_SID; // TwiML App SID for VoIP
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Twilio phone number
const pushCredentialSid = process.env.pushCredentialSid;
const client = twilio(twilioAccountSID, twilioAuthToken);

// Generate Twilio Access Token
export const generateToken = (req, res) => {
  const { identity } = req.body; // Identity is the user ID for whom we are generating the token

  try {
    if (!identity) {
      return res.status(400).json({ message: "Identity is required" });
    }
    const token = new AccessToken(
      twilioAccountSID,
      twilioApiKeySid,
      twilioApiKeySecret,
      { identity, ttl: 3600 } // Token validity is 1 hour
    );

    // Voice Grant
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: twilioTwimlAppSid, // TwiML App for handling the VoIP calls
      pushCredentialSid: pushCredentialSid,
      incomingAllow: true, // Allow incoming calls
    });

    token.addGrant(voiceGrant);
    token.identity = identity; // This is the user identity for the token

    // Send the JWT token to the client
    res.status(200).json({ token: token.toJwt() });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating token", error: error.message });
  }
};

// Token validation
export const validateToken = (req, res) => {
  const { token } = req.body; // Token received from the frontend

  try {
    // Decode and validate the token
    const decodedToken = jwt.verify(token, twilioApiKeySecret); // Decode the token

    const currentTime = Math.floor(Date.now() / 1000); // Get current Unix timestamp
    if (decodedToken.exp > currentTime) {
      // Token is valid and not expired
      return res.status(200).json({ valid: true });
    } else {
      // Token is expired, refresh the token
      console.log("Token expired");

      const { identity } = decodedToken; // Retrieve the identity from the expired token

      // Generate a new token
      const refreshedToken = new AccessToken(
        twilioAccountSID,
        twilioApiKeySid,
        twilioApiKeySecret,
        { identity, ttl: 3600 } // Token validity is 1 hour
      );

      // Voice Grant for the refreshed token
      const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: twilioTwimlAppSid,
        pushCredentialSid: pushCredentialSid,
        incomingAllow: true,
      });

      refreshedToken.addGrant(voiceGrant);

      return res.status(200).json({
        valid: false,
        message: "Token expired, new token generated",
        newToken: refreshedToken.toJwt(),
      });
    }
  } catch (error) {
    // Token is invalid or something went wrong
    console.error("Error validating token:", error);
    return res.status(400).json({ valid: false, message: "Invalid token" });
  }
};

// Make a Call
export const makeCall = async (req, res) => {
  const { to, from } = req.body;
  console.log("req.body", req.body);
  if (!to || !from) {
    return res
      .status(400)
      .json({ message: "Both 'to' and 'from' fields are required." });
  }
  try {
    const call = await client.calls.create({
      to: `client:${to}`,
      from: `client:${from}`,
      twiml: "<Response><Say>Connecting your call.</Say></Response>",
      url: "https://71ec-2409-40f4-1009-f64b-cc5f-6659-8711-1fa4.ngrok-free.app/calls/incoming",
    });
    console.log("call", call);
    res.status(200).json({ message: "Call initiated", call });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: "Error making call", error: err.message });
  }
};

// Handle Incoming Calls (Webhook)
export const incomingCall = async (req, res) => {
  console.log("req.query", req.query);
  console.log("req.headers", req.headers);
  console.log("req.body", req.body);

  // Extract from client (caller)
  const fromClient = req.body.From;
  const fromClientId = fromClient ? fromClient.split(":")[1] : null;

  if (!fromClientId) {
    console.error("Caller Client ID (From) is missing.");
    return res.status(400).send("Caller Client ID is required.");
  }

  // Extract or determine the toClientId (recipient)
  const toClientId = req.body.To || "678f3641ff1c9eb61ca0332d"; // Try to get from the body or query param

  if (!toClientId) {
    console.error("Recipient Client ID (To) is missing.");
    return res.status(400).send("Recipient Client ID is required.");
  }

  console.log("fromClientId:", fromClientId);
  console.log("toClientId:", toClientId);

  // Create TwiML response to route the call
  const twiml = new VoiceResponse();
  const dial = twiml.dial();
  dial.client(toClientId); // Dial the toClientId dynamically

  // Return TwiML response to Twilio
  res.type("text/xml");
  console.log("Generated TwiML:", twiml.toString());
  res.send(twiml.toString());
};

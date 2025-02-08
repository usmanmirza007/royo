import express from "express";
import {
  generateToken,
  incomingCall,
  makeCall,
  validateToken,
} from "../controller/CallController.js";

const router = express.Router();

router.post("/generate-token", generateToken);
router.post("/validate-token", validateToken);
router.post("/initiate-call", makeCall);
router.post("/incoming", incomingCall);

export default router;

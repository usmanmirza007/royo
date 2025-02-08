import AreaDb from "../../model/City&Area Model.js/Area.js";

export async function createArea(req, res, next) {
  try {
    const data = req.body;
    const details = {
      areaName: data.areaName,
      cityId: data.cityId,
    };
    const createArea = await AreaDb.create(details);
    res.status(201).json({
      message: "Area Created Successfully",
      data: createArea,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
export async function getAllArea(req, res, next) {
  try {
    const getArealist = await AreaDb.find();
    res.status(200).json({
      message: "get successfully",
      data: getArealist,
    });
  } catch (err) {
    next();
  }
}

export async function getAreaById(req, res, next) {
  try {
    const cityId = req.params.cityId;
    const getArealist = await AreaDb.find({ cityId });
    res.status(200).json({
      message: "get successfully",
      data: getArealist,
    });
  } catch (err) {
    next();
  }
}

export async function updateArea(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      AreaName: data.AreaName,
      cityId: data.cityId,
    };
    const updateArea = await AreaDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "create successfully",
      data: updateArea,
    });
  } catch (err) {
    next();
  }
}

export async function deleteArea(req, res, next) {
  try {
    const data = req.params;
    const AreaId = data.id;
    const deleteArea = await AreaDb.findByIdAndDelete(AreaId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deleteArea,
    });
  } catch (error) {
    next();
  }
}

///
// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "AC33692d41ed22e3c97e55a39c5602d23c";
// const authToken = "ec256f83fbf0b58b7f7f1688b274fe33";
// const client = require("twilio")(accountSid, authToken);

// client.calls
//   .create({
//     url: "http://demo.twilio.com/docs/voice.xml",
//     to: "+918608204014",
//     from: "+12076147354",
//   })
//   .then((call) => console.log(call.sid));

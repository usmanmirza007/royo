import express from "express";
import {
  createTrainer,
  getTrainerById,
  updateTrainerDetailsById,
  deleteTrainerById,
  getAllTrainers,
  userLogin,
  getAllTrainersByUserType,
} from "../../controller/SignupController/TrainerController.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/TrainerImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

router.post("/createtrainer", createTrainer);

router.get("/getalltrainer", getAllTrainers);
router.get("/gettrainer/:id", getTrainerById);

// app apis ----------------------

router.get("/getallusertype", getAllTrainersByUserType);

// --------------------------------

router.put(
  "/updatetrainer/:id",
  upload.single("image"),
  updateTrainerDetailsById
);

router.delete("/deletetrainer/:id", deleteTrainerById);
router.post("/postlogin", userLogin);

export default router;

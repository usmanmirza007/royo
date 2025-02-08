import TrainerSignupDb from "../../model/SignupModel/TrainerSignup.js";

export const createTrainer = async (req, res) => {
  console.log("req.body", req.body);
  try {
    const newTrainer = new TrainerSignupDb(req.body);
    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (error) {
    console.log('sososo', error);
    
    res.status(400).json({ message: error.message });
  }
};
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await TrainerSignupDb.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTrainersByUserType = async (req, res) => {
  try {
    const { userType } = req.query;

    if (!userType) {
      return res.status(404).json({ message: "userType not found" });
    }

    let query = {};

    if (userType) {
      query.userType = userType;
    }

    const trainers = await TrainerSignupDb.find(query);

    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainerById = async (req, res) => {
  try {
    const trainer = await TrainerSignupDb.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function updateTrainerDetailsById(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      phoneNumber: data.phone,
      emailID: data.email,
      name: data.name,
      founderName: data.founderName,
      noofemployee: data.noofemployee,
      website: data.website,
      country: data.country,
      state: data.state,
      district: data.district,
      city: data.city,
      pincode: data.pincode,
      aboutyouself: data.aboutyouself,
      role: data.role,
      specialization: data.specialization,
      yearofexperience: data.yearofexperience,
      languages: data.languages,
      address: data.address,
      image: data.image,
      auth: data.auth,
    };
    const updateList = await TrainerSignupDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "Update successfully",
      data: updateList,
    });
  } catch (err) {
    next();
  }
}

export const deleteTrainerById = async (req, res) => {
  try {
    const deletedTrainer = await TrainerSignupDb.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTrainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    res.status(200).json({ message: "Trainer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function userLogin(req, res, next) {
  try {
    const data = req.body;
    console.log("data", data);
    const loginData = {
      emailID: data.email,
      password: data.password,
    };
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(data.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const emailExists = await TrainerSignupDb.findOne({ emailID: data.email });
    if (emailExists) {
      if (emailExists.password === data.password) {
        res.status(201).json({
          message: "Login Successfully",
          data: emailExists,
        });
      } else {
        return res.status(400).json({ error: "Password mismatch" });
      }
    } else {
      return res.status(400).json({ error: "Login unsuccessful" });
    }
    console.log('fooffo', emailExists);
    
  } catch (err) {
    console.log('err', err);
    next();
  }
}

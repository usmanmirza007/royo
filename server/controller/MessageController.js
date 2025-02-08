import Messagemodel from "../model/Messagemodel.js";

export const createMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messagemodel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    console.log("data", data);
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

export const getMessage = async (req, res) => {
  try {
    const { from, to } = req.body;

    const messages = await Messagemodel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

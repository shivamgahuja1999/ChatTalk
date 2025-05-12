const Message = require("../models/messageModel");
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: { from, to },
      sender: from,
    });
    if (data) return res.json({ message: "Message added successfully" });
    return res.json({ message: "Faied to add message to the database" });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      $or: [
        { "users.from": from, "users.to": to },
        { "users.from": to, "users.to": from }
      ]
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};

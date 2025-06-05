import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  try {
    await Message.create({ firstName, lastName, email, phone, message });
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete messages" });
  }
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

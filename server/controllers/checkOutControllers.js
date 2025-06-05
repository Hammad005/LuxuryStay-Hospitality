import Checkin from "../models/Checkin.js";
import Checkout from "../models/Checkout.js";
import Room from "../models/Room.js";

export const createCheckOut = async (req, res) => {
  const { _id, numberOfGuests, checkIn, roomsId, servicesUsed, totalAmount } =
    req.body;
  const guest = req.guest;
  try {
    const checkOut = await Checkout({
      registeredGuest: guest._id,
      numberOfGuests,
      checkIn,
      roomsId,
      servicesUsed,
      totalAmount,
    });
    await Checkin.findOneAndDelete({ _id });
    for (const roomId of checkOut?.roomsId) {
      const room = await Room.findOne({ _id: roomId });
      room.roomStatus = "Available";
      await room.save();
    }
    await checkOut.save();
    res.status(201).json({ message: "Check-out successfully", checkOut });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const createCheckOutByStaff = async (req, res) => {
  const {
    guestId,
    _id,
    numberOfGuests,
    checkIn,
    roomsId,
    servicesUsed,
    totalAmount,
  } = req.body;
  try {
    const checkOut = await Checkout({
      registeredGuest: guestId,
      numberOfGuests,
      checkIn,
      roomsId,
      servicesUsed,
      totalAmount,
    });
    await Checkin.findOneAndDelete({ _id });
    for (const roomId of checkOut?.roomsId) {
      const room = await Room.findOne({ _id: roomId });
      room.roomStatus = "Available";
      await room.save();
    }
    await checkOut.save();
    res.status(201).json({ message: "Check-out successfully", checkOut });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserCheckOuts = async (req, res) => {
  try {
    const guest = req.guest;
    const checkOuts = await Checkout.find({ registeredGuest: guest._id })
      .populate("roomsId")
      .populate({
        path: "servicesUsed.service", // populate the 'service' field inside each object of 'servicesUsed' array
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ checkOuts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllCheckOuts = async (req, res) => {
  try {
    const checkOuts = await Checkout.find()
      .populate("registeredGuest")
      .populate("roomsId")
      .populate({
        path: "servicesUsed.service", // populate the 'service' field inside each object of 'servicesUsed' array
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ checkOuts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

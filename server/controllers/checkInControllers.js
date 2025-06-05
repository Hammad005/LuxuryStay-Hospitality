import Booking from "../models/Booking.js";
import Checkin from "../models/Checkin.js";
import Room from "../models/Room.js";

export const createDirectCheckIn = async (req, res) => {
  const { numberOfGuests, checkOut, roomsId, totalAmount } = req.body;
  const guest = req.guest;
  try {
    //check single room that it avaialable or not
    for (const roomId of roomsId) {
      const room = await Room.findOne({ _id: roomId });
      if (!room || room.roomStatus !== "Available") {
        return res.status(400).json({
          error: `Not enough ${room ? room.roomType : ""} room available`,
        });
      }
      room.roomStatus = "Booked";
      await room.save();
    }
    const checkIn = await Checkin({
      registeredGuest: guest._id,
      numberOfGuests,
      checkOut,
      roomsId,
      totalAmount,
    });
    await checkIn.save();
    res.status(201).json({ message: "Check-in successfully", checkIn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const createBookingCheckIn = async (req, res) => {
  const { _id, numberOfGuests, checkOut, roomsId, totalAmount } = req.body;
  const guest = req.guest;
  try {
    const checkIn = await Checkin({
      registeredGuest: guest._id,
      numberOfGuests,
      checkOut,
      roomsId,
      totalAmount,
    });
    await Booking.findOneAndDelete({ _id });
    await checkIn.save();
    res.status(201).json({ message: "Check-in successfully", checkIn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const createBookingCheckInByStaff = async (req, res) => {
  if (
    req.staff.role !== "Admin" &&
    req.staff.role !== "General Manager" &&
    req.staff.role !== "Receptionist"
  ) {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  const { _id, registeredGuest, numberOfGuests, checkOut, roomsId, totalAmount } =
    req.body;
  try {
    const checkIn = await Checkin({
      registeredGuest: registeredGuest._id,
      numberOfGuests,
      checkOut,
      roomsId,
      totalAmount,
    });
    await Booking.findOneAndDelete({ _id });
    await checkIn.save();
    res.status(201).json({ message: "Check-in successfully", checkIn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const allCheckIns = async (req, res) => {
  try {
    const checkIns = await Checkin.find()
      .populate("registeredGuest")
      .populate("roomsId")
      .populate({
        path: "servicesUsed.service", // populate the 'service' field inside each object of 'servicesUsed' array
      })
      .sort({ checkOut: 1 });
    res.status(200).json({ checkIns });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const getUserCheckIns = async (req, res) => {
  const guest = req.guest;
  try {
    const checkIns = await Checkin.find({ registeredGuest: guest._id })
      .populate("roomsId")
      .populate({
        path: "servicesUsed.service", // populate the 'service' field inside each object of 'servicesUsed' array
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ checkIns });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
export const addService = async (req, res) => {
  const { checkinId, roomId, service } = req.body;
  try {
    const checkin = await Checkin.findById(checkinId);
    if (!checkin) {
      return res.status(404).json({ error: "Check-in not found" });
    }
    // Ensure we don't remove old services or ids, just add the new one
    checkin.servicesUsed.push({
      service,
      room: roomId,
    });
    await checkin.save();
    res.status(200).json({ message: "Services added successfully", checkin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

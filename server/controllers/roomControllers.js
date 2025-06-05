import Room from "../models/Room.js";

export const addRoom = async (req, res) => {
    if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
      return res.status(403).json({ error: "Unauthorized, Admin only" });
    }
  const { roomType, roomNumber, roomFloor, roomPrice } = req.body;
  const numericRoomPrice = Number(roomPrice);

  let roomDescription = "";

  if (roomType === "Standard") {
    roomDescription =
      "Stylish room with upscale furnishings with a double bed and basic luxury amenities.";
  } else if (roomType === "Premium") {
    roomDescription =
      "Premium room with exclusive lounge access with a king-sized bed and added services.";
  } else if (roomType === "Suite") {
    roomDescription =
      "Luxurious multi-room suite with VIP services, a separate living room and top-tier privacy.";
  } else if (roomType === "Business-Oriented") {
    roomDescription =
      "Business-focused room with executive amenities, a private lounge and a meeting room.";
  }
  try {
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ error: "Room number already in use!" });
    }
    const room = new Room({
      roomType,
      roomDescription,
      roomNumber,
      roomFloor,
      roomPrice: numericRoomPrice,
    });
    await room.save();
    res.status(201).json({ message: "Room added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  const { roomId } = req.params;
  try {
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

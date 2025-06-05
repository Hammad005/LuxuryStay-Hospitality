import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const createBooking = async (req, res) => {
    const {numberOfGuests, checkIn, checkOut, roomsId, totalAmount} = req.body;
    const guest = req.guest;

    try {
        //check single room that it avaialable or not
        for (const roomId of roomsId) {
            const room = await Room.findOne({ _id: roomId });
            if (!room || room.roomStatus !== "Available") {
                return res.status(400).json({ error: `Not enough ${room ? room.roomType : ''} room available` });
            }
            room.roomStatus = "Booked";
            await room.save();
        }
        const booking = new Booking({
            registeredGuest: guest._id,
            numberOfGuests,
            checkIn,
            checkOut,
            roomsId,
            totalAmount,
        });
        await booking.save();
        res.status(201).json({ message: "Booking created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("registeredGuest").populate("roomsId").sort({ checkIn: 1 });
        res.status(200).json({ bookings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const getGuestBookings = async (req, res) => {
    const guest = req.guest;
    try {
        const bookings = await Booking.find({ registeredGuest: guest._id }).populate("roomsId").populate("registeredGuest").sort({ createdAt: -1 });
        const confirmBooking = bookings.filter((booking) => booking.bookingStatus === "Confirmed");
        res.status(200).json({ bookings: confirmBooking });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if(!booking){
            return res.status(404).json({ error: "Booking not found" });
        }
        for (const roomId of booking?.roomsId) {
            const room = await Room.findOne({ _id: roomId });
            room.roomStatus = "Available";
            await room.save();
        }
        booking.bookingStatus = "Cancelled";
        await booking.save();
        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
export const cancelBookingByStaff = async (req, res) => {
    if (req.staff.role !== "Admin" && req.staff.role !== "General Manager" && req.staff.role !== "Receptionist") {
        return res.status(403).json({ error: "Unauthorized, Admin only" });
    }
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if(!booking){
            return res.status(404).json({ error: "Booking not found" });
        }
        for (const roomId of booking?.roomsId) {
            const room = await Room.findOne({ _id: roomId });
            room.roomStatus = "Available";
            await room.save();
        }
        booking.bookingStatus = "Cancelled";
        await booking.save();
        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
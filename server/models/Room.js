import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        required: true,
        enum: ["Standard", "Premium", "Suite", "Business-Oriented"],
    },
    roomDescription: {
        type: String,
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    roomFloor: {
        type: String,
        required: true,
    },
    roomPrice: {
        type: Number,
        required: true,
    },
    roomStatus: {
        type: String,
        required: true,
        enum: ["Available", "Booked"],
        default: "Available",
    },
}, { timestamps: true });

const Room = mongoose.model("Room", roomSchema);
export default Room;

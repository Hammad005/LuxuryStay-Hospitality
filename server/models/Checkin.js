import mongoose from "mongoose";

const checkinSchema = new mongoose.Schema(
  {
    registeredGuest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    roomsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
    ],
    servicesUsed: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
        room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Checkin = mongoose.model("Checkin", checkinSchema);
export default Checkin;

import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema(
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
    checkIn: {
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

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;

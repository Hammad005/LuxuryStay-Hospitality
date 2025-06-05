import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    serviceDescription: {
        type: String,
        required: true,
    },
    servicePrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);
export default Service;
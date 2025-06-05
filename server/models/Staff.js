import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "General Manager", "Receptionist", "Marketing Manager", "Security Manager", "Housekeeping Manager"],
    },
    salary: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {
    timestamps: true,
});

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
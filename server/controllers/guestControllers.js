import Checkin from "../models/Checkin.js";
import Guest from "../models/Guest.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
export const createGuest = async (req, res) => {
  const { name, email, contact, gender, dob, password } = req.body;
  try {
    const existingGuest = await Guest.findOne({ email });
    if (existingGuest) {
      return res.status(400).json({ error: "Email already in use!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const guest = new Guest({
      name,
      email,
      contact,
      gender,
      dob,
      password: hashedPassword,
    });
    await guest.save();

    const guestToken = jwt.sign({ id: guest._id }, process.env.JWT_GUEST_SECRET, {
      expiresIn: "1d",
    });

    const staffWithoutPass = { ...guest._doc };
    delete staffWithoutPass.password;

    return res
      .status(200)
      .cookie("guestToken", guestToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ guest: guest, message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const checkinGuest = async (req, res) => {
  const { registeredGuest, numberOfGuests, rooms, payment, totalAmount } =
    req.body;
  try {
    const checkin = new Checkin({
      registeredGuest,
      numberOfGuests,
      rooms,
      payment,
      totalAmount,
    });
    await checkin.save();
    res.status(201).json({ message: "Guest checked in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const checkoutGuest = async (req, res) => {
  const { checkinId } = req.body;
  try {
    const checkin = await Checkin.findById(checkinId);
    if (!checkin) {
      return res.status(404).json({ error: "Guest is already checked out" });
    }
    checkin.checkout = Date.now();
    await checkin.save();
    res.status(200).json({ message: "Guest checked out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const checkAuthGuest = async (req, res) => {
  try {
    res.status(200).json({ guest: req.guest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const logoutGuest = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("guestToken", {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllGuests = async (req, res) => {
    try {
        const checkInGuest = await Checkin.find().populate("registeredGuest");
        res.status(200).json({ checkInGuest });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const addService = async (req, res) => {
    
};

export const updateGuest = async (req, res) => {
  const { name, email, contact, gender, dob } = req.body;
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ error: "Guest not found" });
    }
    if(req.guest.email !== email){
      const emailAlreadyExist = await Guest.findOne({ email });
      if (emailAlreadyExist) {
        return res.status(400).json({ error: "Email already in use!" });
      }
    }
    guest.name = name || guest.name;
    guest.email = email || guest.email;
    guest.contact = contact || guest.contact;
    guest.gender = gender || guest.gender;
    guest.dob = dob || guest.dob;
    await guest.save();
    res.status(200).json({ message: "Guest updated successfully", guest });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }  
};

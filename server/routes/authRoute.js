import express from "express";
import Guest from "../models/Guest.js";
import Staff from "../models/Staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingStaff = await Staff.findOne({ email });
    const guest = await Guest.findOne({ email });

    if (!existingStaff && !guest) {
      return res.status(404).json({ error: "Invalid Credentials" });
    }

    if (existingStaff) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingStaff.password
      );
      if (!isPasswordMatch) {
        return res.status(404).json({ error: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { id: existingStaff._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const staffWithoutPass = { ...existingStaff._doc };
      delete staffWithoutPass.password;

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: "Login successful", staff: staffWithoutPass });
    } else {
      const isPasswordValid = await bcrypt.compare(password, guest.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const guestToken = jwt.sign(
        { id: guest._id },
        process.env.JWT_GUEST_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const guestWIthoutPass = { ...guest._doc };
      delete guestWIthoutPass.password;
      return res
        .status(200)
        .cookie("guestToken", guestToken, {
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ guest: guestWIthoutPass, message: "Login successful" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

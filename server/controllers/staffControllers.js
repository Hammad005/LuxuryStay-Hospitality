import Staff from "../models/Staff.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerStaff = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  try {
    const {
      name,
      email,
      dob,
      gender,
      contact,
      education,
      role,
      salary,
      password,
    } = req.body;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
      return res.status(400).json({ error: "Email already in use!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = new Staff({
      name,
      email,
      dob,
      gender,
      contact,
      education,
      role,
      salary,
      password: hashedPassword,
    });
    const savedStaff = await staff.save();
    if (savedStaff) {
      res.status(201).json({ message: "Staff created successfully" });
    } else {
      res.status(500).json({ error: "Failed to create staff" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token", {
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

export const editStaff = async (req, res) => {
  if (req.staff.role !== "Admin" || req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  try {
    const { id } = req.params;
    const data = {
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      contact: req.body.contact,
      education: req.body.education,
      role: req.body.role,
      salary: req.body.salary,
    };

    const updatedStaff = await Staff.findByIdAndUpdate(id, data, { new: true });
    if (!updatedStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.status(200).json({ message: "Staff updated successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ staff: req.staff });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllStaff = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  try {
    const staff = await Staff.find().select("-password").sort({ createdAt: -1 });
    const deleteAdmin = staff?.filter((staff) => staff.role !== "Admin");
    res.status(200).json({ staff: deleteAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  try {
    const { id } = req.params;
    const deletedStaff = await Staff.findByIdAndDelete(id);
    if (!deletedStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }

  try {
    const { id } = req.params;
    const data = {
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      contact: req.body.contact,
      education: req.body.education,
      role: req.body.role,
      salary: req.body.salary,
    };

    const existingStaff = await Staff.findById(id);
    if (!existingStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }

    // Check if email is being changed and is already in use by another staff
    if (existingStaff.email !== data.email) {
      const emailAlreadyExist = await Staff.findOne({ email: data.email });
      if (emailAlreadyExist) {
        return res.status(400).json({ error: "Email already in use!" });
      }
    }

    await Staff.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({ message: "Staff updated successfully"});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

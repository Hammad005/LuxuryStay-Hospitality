import jwt from "jsonwebtoken";
import Staff from "../models/Staff.js";
import Guest from "../models/Guest.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, Please login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const staff = await Staff.findById(decoded.id).select("-password");
      if (!staff) {
        return res.status(401).json({ error: "Unauthorized, Please login" });
      }
      req.staff = staff;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Unauthorized - Access token expired" });
      }
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, Please login" });
  }
};

export const protectGuestRoute = async (req, res, next) => {
  const token = req.cookies.guestToken;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, Please login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_GUEST_SECRET);
    try {
      const guest = await Guest.findById(decoded.id).select("-password");
      if (!guest) {
        return res.status(401).json({ error: "Unauthorized, Please login" });
      }
      req.guest = guest;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Unauthorized - Access token expired" });
      }
      return res
        .status(500)
        .json({ error: error.message || "Internal server error" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, Please login" });
  }
};

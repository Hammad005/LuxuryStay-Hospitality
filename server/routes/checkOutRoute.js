import express from "express";
import { protectGuestRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { createCheckOut, createCheckOutByStaff, getUserCheckOuts, getAllCheckOuts } from "../controllers/checkOutControllers.js";

const router = express.Router();

router.post('/createCheckOut', protectGuestRoute, createCheckOut);
router.post('/createCheckOutByStaff', protectRoute, createCheckOutByStaff);
router.get('/getUserCheckOuts', protectGuestRoute, getUserCheckOuts);
router.get('/getAllCheckOuts', protectRoute, getAllCheckOuts);


export default router;
import express from "express";
import { protectGuestRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { addService, allCheckIns, createBookingCheckIn, createBookingCheckInByStaff, createDirectCheckIn, getUserCheckIns } from "../controllers/checkInControllers.js";

const router = express.Router();

router.post('/createDirectCheckIn', protectGuestRoute, createDirectCheckIn);
router.post('/createBookingCheckIn', protectGuestRoute, createBookingCheckIn);
router.post('/createBookingCheckInByStaff', protectRoute, createBookingCheckInByStaff);
router.get('/getAllCheckIns', protectRoute, allCheckIns);
router.get('/getUserCheckIns', protectGuestRoute, getUserCheckIns);
router.put('/addService', protectGuestRoute, addService);

export default router;
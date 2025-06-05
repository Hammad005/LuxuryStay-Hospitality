import express from "express";
import { protectGuestRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { cancelBooking, cancelBookingByStaff, createBooking, getAllBookings, getGuestBookings } from "../controllers/bookingControllers.js";

const router = express.Router();

router.post('/createBooking', protectGuestRoute, createBooking);

router.get('/getAllBookings', protectRoute, getAllBookings);
router.get('/getGuestBookings', protectGuestRoute, getGuestBookings);

router.put('/cancelBooking/:id', protectGuestRoute, cancelBooking);
router.put('/cancelBookingByStaff/:id', protectRoute, cancelBookingByStaff);



export default router;
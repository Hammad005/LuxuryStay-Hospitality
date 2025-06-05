import express from "express";
import { protectGuestRoute, protectRoute } from "../middlewares/authMiddleware.js";
import { addService, checkAuthGuest, checkinGuest, checkoutGuest, createGuest, getAllGuests,  logoutGuest, updateGuest } from "../controllers/guestControllers.js";

const router = express.Router();

router.get('/getAllGuests', protectRoute, getAllGuests);

router.post('/checkin', protectRoute, checkinGuest);
router.post('/checkout', protectRoute, checkoutGuest);


router.get('/checkAuth', protectGuestRoute, checkAuthGuest);
router.post('/createGuest', createGuest);
router.post('/logout', logoutGuest);
router.put('/addService', protectGuestRoute, addService);
router.put('/updateGuest/:id', protectGuestRoute, updateGuest);

export default router;
import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { addRoom, deleteRoom, getRooms } from "../controllers/roomControllers.js";

const router = express.Router();

router.post('/addRoom', protectRoute, addRoom);
router.get('/getRooms',  getRooms);
router.delete('/deleteRoom/:roomId', protectRoute, deleteRoom);

export default router;
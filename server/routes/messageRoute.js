import express from "express";
import { deleteMessage, getMessages, sendMessage } from "../controllers/messageController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/sendMessage', sendMessage);
router.get('/getMessages', protectRoute, getMessages);
router.delete('/deleteMessage/:id', protectRoute, deleteMessage);

export default router;
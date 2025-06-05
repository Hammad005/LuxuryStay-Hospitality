import express from "express";
import { checkAuth, deleteStaff, editStaff,  getAllStaff,  logout, registerStaff, updateStaff } from "../controllers/staffControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/checkAuth', protectRoute, checkAuth);
router.post("/register",protectRoute, registerStaff);
router.post("/logout", logout);
router.put("/edit/:id", protectRoute, editStaff);
router.get("/getAllStaff", protectRoute, getAllStaff)
router.delete("/deleteStaff/:id", protectRoute, deleteStaff);
router.put("/updateStaff/:id", protectRoute, updateStaff);

export default router;
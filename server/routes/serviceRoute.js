import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { addService, deleteService, getServices, updateService } from "../controllers/serviceControllers.js";

const router = express.Router();

router.get('/getServices',  getServices);
router.post('/addService', protectRoute, addService);
router.put('/updateService/:id', protectRoute, updateService);
router.delete('/deleteService/:id', protectRoute, deleteService);


export default router;
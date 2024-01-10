import { Router } from "express";
import {getDevices, getDeviceById, createDevice, updateDeviceById} from "../controllers/device.controller.js";
import { authenticate, authenticateVerify } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.use(authenticateVerify());

router.get("/get-devices", requireAdmin(), getDevices);
router.get("/:id", getDeviceById);
router.post("/create", createDevice);
router.put("/update/:id", updateDeviceById);

export default router;

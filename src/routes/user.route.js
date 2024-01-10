import { Router } from "express";
import { resendVerifyCode } from "../controllers/auth.controller.js";
import { getUsers, getUserById, updateUserById, deleteUserById, changePassword} from "../controllers/user.controller.js";
import { getAllDeviceByUserId } from "../controllers/device.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
const router = Router();

router.use(authenticate());

router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.get("/:userId/get-all-devices", getAllDeviceByUserId);

router.put("/change-password/:id", changePassword);

export default router;

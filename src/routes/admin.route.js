import { Router } from "express";
import { getUsers, getUserById, updateUserById, deleteUserById, changePassword} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();

router.use(requireAdmin())

router.get("/get-users", getUsers);
router.get("/get-user/:id", getUserById);
router.delete("/delete-user/:id", deleteUserById);

export default router;

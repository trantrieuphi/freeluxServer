import { Router } from "express";
import { register, login, logout, verify } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authenticate(), verify);
router.post("/logout", authenticate(), logout);
export default router;


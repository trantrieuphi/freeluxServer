import { Router } from "express";
import { register, login, logout, verify, resendVerifyCode } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", authenticate(), verify);
router.post("/resend-verify-code", authenticate(), resendVerifyCode);
router.post("/logout", authenticate(), logout);
export default router;


import { authenticate } from "./authenticate.js";
import { sendError, sendErrorServerInterval, HttpStatusCode } from "../helper/client.js";
import { pool } from "../helper/db.js";

export const requireAdminMiddleware = async (req, res, next) => {
    const userId = res.locals.user[0].userId;
    // console.log(userId);
    try {
        const [admin] = await pool.query("SELECT * FROM user WHERE userId = ?", [userId]);

        if(admin[0].role !== "admin") {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not admin");
        }

        next();
    } catch (error) {
        
    }
}

export const requireAdmin = (req, res, next) => {
    return [
        // authenticate,
        requireAdminMiddleware
    ]
}
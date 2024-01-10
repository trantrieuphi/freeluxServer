import jwt from "jsonwebtoken";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";
import { pool } from "../helper/db.js";

export const deserializeUser = async (req, res, next) => {
    const data = req.headers['authorization'];
    if (!data) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Unauthorized");
    }
    const accessToken = data.split(" ")[1];
    // console.log(accessToken);
    try {
        const { payload } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY, { complete: true });
        // console.log(payload);
        const user = await pool.query("SELECT * FROM user WHERE userId = ?", [payload.userId]);
        // console.log(user);
        res.locals.user = user[0];
        next();
    } catch (error) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Unauthorized");
    }
}

export const requireUser = (req, res, next) => {
    const { user } = res.locals;

    if (!user) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Not found user.");
    }
    next();
}

export const requireVerify = (req, res, next) => {
    const user  = res.locals.user;
    // console.log(user);
    // console.log(user[0].isVerified);
    if (!user[0].isVerified) {
        return sendError(res, HttpStatusCode.UNAUTHORIZED, "Not verify.");
    }
    next();
}

export const authenticate = (req, res, next) => {
    return [
        deserializeUser,
        requireUser
    ]
}

export const authenticateVerify = (req, res, next) => {
    return [
        deserializeUser,
        requireUser,
        requireVerify
    ]
}

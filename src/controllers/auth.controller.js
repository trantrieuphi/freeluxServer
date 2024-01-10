import { pool } from "../helper/db.js";
import omit from "lodash.omit";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { sendCodeVerify } from "../helper/mailService.js";

import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";

export const register = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE username = ?", [username]);
        if (user.length > 0) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Username already exists");
        }
        //use uuid
        const role = "user";
        const userId = uuidv4();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        const [newUser] = await pool.query("INSERT INTO user (userId, firstName, lastName, email, username, password, role, verifyCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [userId, firstName, lastName, email, username, hashedPassword, role, verifyCode]);
        const [userCreated] = await pool.query("SELECT * FROM user WHERE userId = ?", [userId]);
        const accessToken = jwt.sign({ userId: userCreated[0].userId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        //send mail to verify
        const info = await sendCodeVerify(email, verifyCode);
        if (info) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Send mail failed");
        }
        return sendSucces(res, "register successfully", { user: omit(userCreated[0], "password"), accessToken });

    }
    catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}

export const verify = async (req, res) => {
    const { verifyCode } = req.body;
    if(!res.locals.user){
        //not have user
        return sendError(res, HttpStatusCode.BAD_REQUEST, "Not have user");
    }
    const userId = res.locals.user[0].userId;
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE userId = ?", [userId]);
        if (user[0].verifyCode !== verifyCode) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Verify code is incorrect");
        }
        //if verify code is correct, update isVerify to true
        await pool.query("UPDATE user SET isVerified = ? WHERE userId = ?", [true, userId]);
        const [userUpdated] = await pool.query("SELECT * FROM user WHERE userId = ?", [userId]);

        return sendSucces(res, "verify successfully", omit(userUpdated[0], "password"));
    }
    catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}

export const resendVerifyCode = async (req, res) => {
    if(!res.locals.user){
        //not have user
        return sendError(res, HttpStatusCode.BAD_REQUEST, "Not have user");
    }
    const userId = res.locals.user[0].userId;
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE userId = ?", [userId]);
        const verifyCode = Math.floor(100000 + Math.random() * 900000);
        await pool.query("UPDATE user SET verifyCode = ? WHERE userId = ?", [verifyCode, userId]);
        const [userUpdated] = await pool.query("SELECT * FROM user WHERE userId = ?", [userId]);
        const info = await sendCodeVerify(userUpdated[0].email, verifyCode);
        if (info) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Send mail failed");
        }
        return sendSucces(res, "resend verify code successfully");
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}



export const login = async (req, res) => {
    const { username, password } = req.body;

    try {

        const [user] = await pool.query("SELECT * FROM user WHERE username = ?", [username]);
        if (user.length === 0) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Username or password is incorrect");
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Username or password is incorrect");
        }

        const accessToken = jwt.sign({ userId: user[0].userId }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        return sendSucces(res, "login successfully", { user: omit(user[0], "password"), accessToken });

    } catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}

// export const verify

export const logout = async (req, res) => {
// delete token or expire token when logout
    try {
        return sendSucces(res, "logout successfully");

    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}


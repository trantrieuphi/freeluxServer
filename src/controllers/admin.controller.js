import { pool } from "../helper/db.js";
import { HttpStatusCode, sendError, sendErrorServerInterval, sendSucces } from "../helper/client.js";
import omit from "lodash.omit";


export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM user");
        console.log(rows);
        return sendSucces(res, HttpStatusCode.OK, rows);    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}


export const deleteUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [user] = await pool.query("SELECT * FROM user WHERE userId = ?", [id]);
        if (user.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "User not found");
        }
        await pool.query("DELETE FROM user WHERE userId = ?", [id]);
        return sendSucces(res, "Delete successfully", omit(user[0], "password"));
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}
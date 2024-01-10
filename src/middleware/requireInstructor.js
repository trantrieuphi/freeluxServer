import { sendErrorServerInterval, sendError } from "../helper/client.js";
import { pool } from "../helper/db.js";
import { authenticate } from "./authenticate.js";

export const requireInstructorMiddleware = async (req, res, next) => {
    const { user } = res.locals;
    console.log(user[0].role);
    // if(user[0].role !== 'instructor' && user[0].role !== 'admin') {
    //     // return sendError(res, HttpStatusCode.FORBIDDEN, "You are not instructor");
    //     console.log("You are not instructor");
    // } else {
    //     console.log("You are instructor");
    // }
    try {
        if(user[0].role === 'instructor' || user[0].role === 'admin') {
            next();
        } else {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not instructor");
        }

    }
    catch (error) { 
        console.log(error);
        sendErrorServerInterval(res, error);
    }
}

export const requireInstructor = (req, res, next) => {
    return [
        authenticate(),
        requireInstructorMiddleware
    ]
}
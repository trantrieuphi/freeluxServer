import { sendError, sendErrorServerInterval, HttpStatusCode } from "../helper/client.js";
import { pool } from "../helper/db.js";
import { authenticate } from "./authenticate.js";

export const requireAuthorCommentMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = res.locals;

        const [comment] = await pool.query("SELECT * FROM comment WHERE id = ?", [id]);

        if(comment[0].author_id !== user.id && user.role !== "admin") {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not author");
        }

        next();
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const requireAuthorComment = (req, res, next) => {
    return [
        authenticate(),
        requireAuthorCommentMiddleware
    ]
}

export const requireAuthorPostMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = res.locals;

        const [post] = await pool.query("SELECT * FROM post WHERE id = ?", [id]);

        if(post[0].author_id !== user.id && user.role !== "admin") {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not author");
        }

        next();
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const requireAuthorPost = (req, res, next) => {
    return [
        authenticate,
        requireAuthorPostMiddleware
    ]
}

export const requireAuthorCourseMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const [course] = await pool.query("SELECT * FROM course WHERE id = ?", [1]);

        if(course[0].author_id === user[0].id || user[0].role == "admin") {
            next();
        } else {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not author");
        }
    } catch (error) {
        console.log(error);
        sendErrorServerInterval(res, error);
    }
}

export const requireAuthorCourse = (req, res, next) => {
    return [
        authenticate(),
        requireAuthorCourseMiddleware
    ]
}

export const requireAuthorLessonMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const [lesson] = await pool.query("SELECT * FROM lesson WHERE id = ?", [id]);

        if(lesson[0].author_id !== user.id && user.role !== "admin") {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not author");
        }

        next();
    } catch (error) {
        sendErrorServerInterval(res, error);
    }
}

export const requireAuthorLesson = (req, res, next) => {
    return [
        authenticate(),
        requireAuthorLessonMiddleware
    ]
}

export const requireAuthorQuizMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const [quiz] = await pool.query("SELECT * FROM quiz WHERE id = ?", [id]);

        if(quiz[0].author_id !== user[0].id && user[0].role !== "admin") {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not author");
        }
        console.log(quiz[0].author_id);

        next();
    } catch (error) {
        console.log(error);
        sendErrorServerInterval(res, error);
    }
}

export const requireAuthorQuiz = (req, res, next) => {
    return [
        authenticate(),
        requireAuthorQuizMiddleware
    ]
}

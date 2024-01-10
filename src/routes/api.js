import { Router } from "express";
import user from "./user.route.js";
import auth from "./auth.route.js";
import admin from "./admin.route.js";
import device from "./device.route.js";

const api = Router();

api.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});

api.use("/user", user);
api.use("/auth", auth);
api.use("/admin", admin);
api.use("/device", device);



export default api;
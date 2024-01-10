import { pool } from '../helper/db.js';
import { sendSucces, sendError, sendErrorServerInterval, HttpStatusCode } from '../helper/client.js';
import e from 'express';

export const getDevices = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM device");
        return sendSucces(res, HttpStatusCode.OK, rows);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getDeviceById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const [device] = await pool.query("SELECT * FROM device WHERE id = ?", [id]);
        if (device.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "Device not found");
        }
        return sendSucces(res, HttpStatusCode.OK, device[0]);
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const getAllDeviceByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId);
    // console.log(userId);
    try {
        // handle uuid to id

        const query = "SELECT * FROM device WHERE id IN (SELECT deviceID FROM relatedDevice WHERE userID = ?)";
        //get all device id by userId from relatedDevice table
        const [devices] = await pool.query(query, [userId]);
        // console.log(devices);
        if (devices.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "Device not found");
        }

        return sendSucces(res, HttpStatusCode.OK, devices);

    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }
}

export const createDevice = async (req, res) => {
    const { name, macAddress, clientID, pairingCode, deviceType, connectionCounter} = req.body;
    const userId = res.locals.user[0].userId;
    // console.log(userId);
    try {
        const [device] = await pool.query("SELECT * FROM device WHERE macAddress = ?", [macAddress]);
        if (device.length > 0) {
            return sendError(res, HttpStatusCode.BAD_REQUEST, "Device already exists");
        }
        //insert new device to device table and insert new device to relatedDevice table
        const [newDevice] = await pool.query("INSERT INTO device (name, macAddress, clientID, pairingCode, deviceType, connectionCounter) VALUES (?, ?, ?, ?, ?, ?)", [name, macAddress, clientID, pairingCode, deviceType, connectionCounter]);
        //insert new device to relatedDevice table
        await pool.query("INSERT INTO relatedDevice (userId, deviceId) VALUES (?, ?)", [userId, newDevice.insertId]);

        const [deviceCreated] = await pool.query("SELECT * FROM device WHERE id = ?", [newDevice.insertId]);
        return sendSucces(res, "Create successfully", deviceCreated[0]);
    }
    catch (error) {
        console.log(error);
        return sendErrorServerInterval(res, error);
    }
}

export const updateDeviceById = async (req, res) => {
    const userId = res.locals.user[0].userId;
    const id = parseInt(req.params.id);
    const { name, macAddress, clientId, pairingCode, deviceType, connectionCounter } = req.body;
    try {
        const [device] = await pool.query("SELECT * FROM device WHERE id = ?", [id]);
        if (device.length === 0) {
            return sendError(res, HttpStatusCode.NOT_FOUND, "Device not found");
        }
        // check user is owner of device
        const [relatedDevice] = await pool.query("SELECT * FROM relatedDevice WHERE userId = ? AND deviceId = ?", [userId, id]);    
        if (relatedDevice.length === 0) {
            return sendError(res, HttpStatusCode.FORBIDDEN, "You are not owner of device");
        }
        //update device
        await pool.query("UPDATE device SET name = ?, macAddress = ?, clientId = ?, pairingCode = ?, deviceType = ?, connectionCounter = ? WHERE id = ?", [name, macAddress, clientId, pairingCode, deviceType, connectionCounter, id]);
        const [deviceUpdated] = await pool.query("SELECT * FROM device WHERE id = ?", [id]);
        return sendSucces(res, "Update successfully", deviceUpdated[0]);
        
    }
    catch (error) {
        return sendErrorServerInterval(res, error);
    }   
}


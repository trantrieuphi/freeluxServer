import { createPool } from "mysql2/promise.js";
import config from "../../config/dbConfig.js";

export const pool = createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.db_port,
});


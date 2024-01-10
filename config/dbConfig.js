import dotenv from 'dotenv';
dotenv.config();

const config = {
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD|| 'Phi1272001@',
    host: process.env.DB_HOST|| 'localhost',
    database: process.env.DB_DATABASE || 'FreeluxDB',
    port: process.env.PORT || 3000,
    db_port: process.env.DB_PORT || 3306,
};

export default config;
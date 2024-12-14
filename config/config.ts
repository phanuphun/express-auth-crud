import dotenv from 'dotenv';
dotenv.config();
const host = String(process.env.HOST);

export const config = {
    host: host,
    port: Number(process.env.PORT),
    imgUrl: `${host}/uploads/`,
    privateKey: String(process.env.PRIVATE_KEY),
};

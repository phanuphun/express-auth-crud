import dotenv from 'dotenv';
dotenv.config();
const baseUrl = String(process.env.BASE_URL) || 'http://localhost:4030';

export const config = {
    port: process.env.PORT,
    baseUrl: baseUrl,
    imgUrl: `${baseUrl}/uploads/`,
    privateKey: String(process.env.PRIVATE_KEY),
};

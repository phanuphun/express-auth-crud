import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { config } from '../config/config';

const privateKey = config.privateKey;

export const validateToken: RequestHandler = async (req, res, next) => {
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        res.status(401).send({
            errCode: 'Forbidden',
            errMsg: 'You have been denied access.',
        });
    } else if (!privateKey) {
        res.status(401).send({
            errCode: 'Server Error',
            errMsg: 'Unable to verify the request at the moment. Please try again later.',
        });
    } else {
        jwt.verify(token, String(privateKey), (err) => {
            if (err instanceof JsonWebTokenError) {
                if (err.message === 'invalid signature') {
                    res.status(401).send({
                        errCode: 'Unauthorized',
                        errMsg: err.message,
                    });
                } else if (err.name === 'TokenExpiredError') {
                    res.status(401).send({
                        errCode: 'Unauthorized',
                        errMsg: 'Your session has expired. Please log in again.',
                    });
                } else {
                    res.status(401).send({
                        errCode: err.name,
                        errMsg: err.message,
                    });
                }
            } else {
                next();
            }
        });
    }
};

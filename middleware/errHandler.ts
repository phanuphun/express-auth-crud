import { Prisma } from '@prisma/client';
import { ErrorRequestHandler } from 'express';

export interface CustomErr {
    type: 'CustomErr';
    errCode: string;
    message: string;
    statusCode: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        let statusCode = 500;
        let errMsg = 'Unknow error occurred on prisma';
        // Custom prisma client error
        if (err.code === 'P2002') {
            statusCode = 409;
            if (err.message) errMsg = err.message;
            else errMsg = 'Duplicate entry';

        } else if (err.code === 'P2003') {
            statusCode = 409;
            if (err.message) errMsg = err.message;
            else errMsg = 'Cannot complete the operation due to related records';

        } else if (err.code === 'P2025') {
            statusCode = 404;
            errMsg = 'Record not found';
        }
        console.log(`Error Code : ${err.code} - ${err.message}`);
        res.status(statusCode).send({
            errCode: err.code,
            errMsg,
        });
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        console.log(`Error Code : Client Validation Error - ${err.message}`);
        res.status(400).send({
            errCode: 'Client Validation Error',
            errMsg: 'Missing field or Incorrect field type provided for query data',
            err,
        });
    } else if (err.statusCode === 401) {
        res.status(err.statusCode).send({
            errCode: err.statusCode,
            errMsg: 'Unauthorised',
        });
    } else if (err.type === 'CustomErr') {
        const error: CustomErr = err;
        res.status(error.statusCode || 400).send({
            errCode: error.errCode,
            errMsg: error.message,
        });
    } else {
        console.log(`Unknow error occurred : ${err}`);
        res.status(err.statusCode).send({
            errCode: err.statusCode,
            errMsg: 'Unknow error occurred',
            err,
        });
    }
};

export default errHandler;

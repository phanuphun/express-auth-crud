import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        let statusCode = 500;
        let errMsg = "Unknow error occurred on prisma";
        if (err.code === "P2002") {
            statusCode = 400;
            if (err.message) errMsg = err.message;
            else errMsg = "Duplicate entry";
        } else if (err.code === "P2025") {
            statusCode = 404;
            errMsg = "Record not found";
        }
        console.log(`${err.code} - ${errMsg} : ${err}`);
        res.status(statusCode).send({ errCode: err.code, errMsg, err });
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send({
            errCode: "Unknow Code",
            errMsg: "Missing field or Incorrect field type provided for query data",
            err,
        });
    } else if (err.statusCode === 401) {
        res.status(err.statusCode).send({
            errCode: err.statusCode,
            errMsg: "Unauthorised",
            err,
        });
    } else {
        console.log(`Unknow error occurred : ${err}`);
        res.status(err.statusCode).send({
            errCode: err.statusCode,
            errMsg: "Unknow error occurred",
            err,
        });
    }
};

export default errHandler;

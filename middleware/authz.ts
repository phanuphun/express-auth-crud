import jwt from "jsonwebtoken";
import process from "process";
import { RequestHandler } from "express";

const privateKey = process.env.PRIVATE_KEY

export const validateToken:RequestHandler = async (req,res,next) => {
    const token = String(req.headers.authorization).split(' ')[1]
    if(!token){
        res.status(401).send({ errCode: 'Unauthorized' , errMsg: 'You dont have access permission.' })
    }else{
        jwt.verify(token,String(privateKey),(err)=>{
            if(err){
                res.status(401).send({errCode: err.name , errMsg: err.message ,err })
            }else{
                next();
            }
        })
    }
}



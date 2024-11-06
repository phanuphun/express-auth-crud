import jwt from "jsonwebtoken";
import process from "process";
import { NextFunction as Next , NextFunction, Request as Req , Response as Res } from "express";
import { RequestHandler } from "express";

interface Payload{
    id?:number,
    username:string,
    password:string
}


const privateKey = process.env.PRIVATE_KEY

async function createToken (payload:Payload):Promise<string>{
    return jwt.sign(payload,String(privateKey),{
        algorithm:'HS256',
        expiresIn:'10hr',
    })
};

const validateToken:RequestHandler = async (req,res,next) => {
    const token = String(req.headers.authorization).split(' ')[1]
    if(!token){
        res.status(401).send({ message: 'You dont have access permission.' })
    }else{
        jwt.verify(token,String(privateKey),(error)=>{
            if(error){
                res.status(401).send({ message: 'You dont have access permission.' })
            }else{
                next();
            }
        })
    }
}


const auth = {
    createToken,
    validateToken
}

export default auth

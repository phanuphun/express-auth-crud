import { Request as Req, Response as Res } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import auth from "../utils/auth"

const prisma = new PrismaClient();

const login = async (req: Req, res: Res) => {
    const {username,password} = req.body
    try{
        const user = await prisma.users.findFirst({
            where:{username}
        })

        if(user === null){
            res.status(404).send({ message: 'User not found' });
        }
        else {
            if(await bcrypt.compare(password,user.password)){
                const token = await auth.createToken(user);
                res.status(200).send({
                    user:{
                        id:user.id,
                        username:user.username
                    },
                    token,
                    message: 'Login Success!!'
                });
            }else{
                res.status(401).send({ message: 'Username or Password Invalid' });
            }
        }
    }catch(err){
        console.error('Error Login user:', err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).send({ message: 'Database error' , err });
        }else{
            res.status(500).send({ message: 'Internal server error' ,err });
        }
    }
};

const register = async (req: Req, res: Res) => {
    const {username , password} = req.body
    const hashPassword: string = await bcrypt.hash(password, 10);

    try{
        const users = await prisma.users.findMany(
            {
                where: {username}
            }
        )

        if(users.length >= 1){
            res.status(409).send({ message: 'Username already exists' });
        }else{
            await prisma.users.create({
                data:{
                    username:username,
                    password:hashPassword
                }
            })
            res.status(201).send({ message: 'User registered successfully' });
        }

    }catch(err){
        console.error('Error registering user:', err);
        if(err instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).send({ message: 'Database error' , err });
        }else{
            res.status(500).send({ message: 'Internal server error' , err });
        }
    }
};

const loginCt = {
    login,
    register,
};

export default loginCt;

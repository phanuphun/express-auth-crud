import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/createToken';

const prisma = new PrismaClient();

const login: RequestHandler = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.users.findUnique({
            where: { username },
        });

        if (user !== null) {
            if (await bcrypt.compare(password, user.password)) {
                const token = await createToken(user);
                res.status(200).send({
                    user: {
                        id: user.id,
                        username: user.username,
                    },
                    token,
                    message: 'Login Success!!',
                });
            } else {
                res.status(401).send({
                    message: 'Username or Password Invalid',
                });
            }
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        next(err);
    }
};

const register: RequestHandler = async (req, res, next) => {
    const { username, password } = req.body;
    const hashPassword: string = await bcrypt.hash(password, 10);

    try {
        const users = await prisma.users.findUnique({
            where: { username },
        });

        if (users !== null) {
            res.status(409).send({ message: 'Username already exists' });
        } else {
            await prisma.users.create({
                data: {
                    username: username,
                    password: hashPassword,
                },
            });
            res.status(201).send({ message: 'User registered successfully' });
        }
    } catch (err) {
        next(err);
    }
};

const authCt = {
    login,
    register,
};

export default authCt;

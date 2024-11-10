import jwt from 'jsonwebtoken';
import {config} from '../config/config';

interface Payload {
    id?: number;
    username: string;
    password: string;
}

const privateKey = config.privateKey;

export async function createToken(
    payload: Payload,
    rememberMe: boolean = false,
): Promise<string> {
    return jwt.sign(
        { id: payload.id, username: payload.username },
        String(privateKey),
        {
            algorithm: 'HS256',
            expiresIn: rememberMe ? '999d' : '10h',
        },
    );
}

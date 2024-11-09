import express from 'express';
import authCt from '../controller/auth.controller';
const route = express.Router();

route.post('/login', authCt.login);
route.post('/register', authCt.register);

export { route as loginRoute };

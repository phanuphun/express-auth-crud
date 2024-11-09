import express from 'express';
import authCt from '../controller/authController';
const route = express.Router();

route.post('/login', authCt.login);
route.post('/register', authCt.register);

export { route as loginRoute };

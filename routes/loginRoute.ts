import express from "express";
import loginCt from "../controller/loginController";
import auth from "../utils/auth"

const route = express.Router();

route.post('/login',loginCt.login)
route.post('/register',loginCt.register)

export {route as loginRoute};

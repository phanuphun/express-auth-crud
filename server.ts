import express from "express";
import path from "path";
import {loginRoute} from './routes/loginRoute';
import process from "process";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'./public')))

app.use(loginRoute)
app.get('/',(req,res)=>{
    res.status(200).send("hello express authen")
})

app.listen(port||3030 ,()=>{
    console.log('server start at port: ',port||3030);
})
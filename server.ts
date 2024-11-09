import express from "express";
import path from "path";
import router from './routes/route';
import process from "process";
import errHandler from "./middleware/errHandler";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'./public')))

app.use(router);

app.get('/',(req,res)=>{
    res.status(200).send("Welcome to express api for testing Auth and CRUD system.")
})

app.use(errHandler);

app.listen(port||3030 ,()=>{
    console.log('server start at port: ',port||3030);
})

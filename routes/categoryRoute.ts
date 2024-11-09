import categoryCt from "../controller/categoryController";
import express from "express";

const route = express.Router();


route.get('/getCategory',categoryCt.getCategory)
route.post('/addCategory',categoryCt.addCategory)
route.post('/updateCategory',categoryCt.updateCategory)
route.delete('/deleteCategory/:id',categoryCt.deleteCategory)

export {route as categoryRoute};

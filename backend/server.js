import express from "express";
import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")))
app.use(expressLayouts);
app.set('layout','layout');
app.set("view engine","ejs");

connectDB();


app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000");
})
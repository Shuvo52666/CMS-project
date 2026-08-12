import express from "express";
import ejs from "ejs";
import expressLayouts from "express-ejs-layouts";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";
import cookieParser from "cookie-parser";

import frontend from "./routes/frontend.js"
import admin from "./routes/admin.js"

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout','layout'); //set default value
app.set("view engine","ejs");

connectDB();

// api routes
app.use("/",frontend);

//for override layout
app.use('/admin',(req,res,next)=>{
    res.locals.layout = "admin/layout";
    next();
})
//

app.use("/admin",admin)

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000");
})
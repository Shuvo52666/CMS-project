import News from "../models/News.js"
import Category from "../models/Category.js"
import User from "../models/User.js"
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import createError from "../utils/error.js";
import {validationResult} from 'express-validator'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const allArticle = async (req,res,next)=>{
    try {
        let articles;
        if(req.role === "admin"){
            articles = await News.find()
                                .populate('category','name')
                                .populate('author','fullname'); //the value of populate is the field name of the schemas          
        }else{
            articles = await News.find({author:req.id})
                                .populate('category','name')
                                .populate('author','fullname');
        }
        //    res.json(articles)
        res.render('admin/articles/index',{articles,role:req.role})
    } catch (error) {
    // console.error(error);
    // res.status(500).json({
    //     message: error.message
    // });
    next(error);
}
    

}
const addArticlePage = async (req,res,next)=>{
    try {
        const categories = await Category.find();
        res.render('admin/articles/create',{categories,role:req.role,errors:0})
        // console.log("hello")
    } catch (error) {
        // res.status(500).send(error);
        next(error);
    }
}
const addArticle = async (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const categories = await Category.find()
        return res.render('admin/articles/create',{
            categories,
            role:req.role,
            errors:errors.array()
        })
    }
    const {title,content,category} = req.body;
    try {
        const article = new News({
            title,
            content,
            category,
            author:req.id,
            image:req.file.filename
        });
        await article.save();
        res.redirect("/admin/article");
    } catch (error) {
        // res.status(500).send("article not saved");
        next(error);
    }
}
const updateArticlePage = async (req,res,next)=>{
    try {
        const id = req.params.id;
        const article = await News.findById(id)
                                            .populate('category','name')
                                            .populate('author','fullname');
        if(!article){
            // return res.status(404).send("article not found");
            // const error = new Error('article not found');
            // error.status = 404;
            // return next(error);

            return next(createError('article not found',404));

        }

        if(req.role == "author"){
            if(req.id != article.author._id){
                return res.send("unauthorized action");
            }
        }
        const categories = await Category.find();
        res.render('admin/articles/update',{role:req.role,categories,article,errors:0});
    } catch (error) {
        // console.log(error);
        // res.status(500).send("internal server error");
        next(error);
    }
    
}
const updateArticle = async (req,res,next)=>{
    const id = req.params.id;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const article = await News.findById(id)
                                            .populate('category','name')
                                            .populate('author','fullname');
        const categories = await Category.find()
        return res.render('admin/articles/update',{
            article,
            categories,
            role:req.role,
            errors:errors.array()
        })
    }
    try {
        const {title,content,category} = req.body;
        const article = await News.findById(id);
        if(!article){
            // return res.status(404).send("article not found");
            return next(createError('article not found',404));
        }

        if(req.role == "author"){
            // console.log(req.id); //article is not populated to is returns object id so we need to use _id
             // console.log(article.author);// we can use id when we have _id then it converts _id to id string
            if(req.id != article.author._id){
                return res.send("unauthorized action");
            }
        }

        article.title = title;
        article.content = content;
        article.category = category;
        if(req.file){
            const filepath = path.join(__dirname,"../public/uploads",article.image);
            fs.unlinkSync(filepath,(err)=>{
                if(err) console.log("failed to delete image")
            })
            article.image = req.file.filename;
        }
        await article.save();
        res.redirect("/admin/article");

    } catch (error) {
        // res.status(500).send(error);
        next(error);
    }
}
const deleteArticle = async (req,res,next)=>{
    const id = req.params.id;
    try{
        const article = await News.findById(id);
        if(!article){
            // return res.status(404).send("article not found");
            return next(createError('article not found',404));
        }
        if(req.role == "author"){
            if(req.id != article.author._id){
                return res.send("unauthorized action");
            }
        }
        if(article.image){ //path.join("./public/uploads",article.image); // here path.join need actual path of folder
            try {
                const filepath = path.join(__dirname,"../public/uploads",article.image); //here 1st it will ditect where am i working by dirname and then ../ up one folder then go public and then uploads and then join the upload folder
                // console.log(filepath)
                fs.unlinkSync(filepath,(err)=>{
                    if(err) console.log("failed to delete image");
                })
            } catch (error) {
                console.log(error);
            }

        }
        await article.deleteOne();

        res.json({success:true})
    }catch(error){
        // res.status(500).send("internal server error");
        next(error);
    }
     
}

export default {
    allArticle,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle,
}
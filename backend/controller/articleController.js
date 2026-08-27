import News from "../models/News.js"
import Category from "../models/Category.js"
import User from "../models/User.js"
import fs from "fs";
import path from "path";

const allArticle = async (req,res)=>{
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
    console.error(error);
    res.status(500).json({
        message: error.message
    });
}
    

}
const addArticlePage = async (req,res)=>{
    try {
        const categories = await Category.find();
        res.render('admin/articles/create',{categories,role:req.role})
        // console.log("hello")
    } catch (error) {
        res.status(500).send(error);
    }
}
const addArticle = async (req,res)=>{
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
        res.status(500).send("article not saved");
    }
}
const updateArticlePage = async (req,res)=>{
    try {
        const id = req.params.id;
        const article = await News.findById(id)
                                            .populate('category','name')
                                            .populate('author','fullname');
        if(!article){
            return res.status(404).send("article not found");
        }

        if(req.role == "author"){
            if(req.id != article.author._id){
                return res.send("unauthorized action");
            }
        }
        const categories = await Category.find();
        res.render('admin/articles/update',{role:req.role,categories,article});
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error");
    }
    
}
const updateArticle = async (req,res)=>{
    const id = req.params.id;
    try {
        const {title,content,category} = req.body;
        const article = await News.findById(id);
        if(!article){
            return res.status(404).send("article not found");
        }

        if(req.role == "author"){
            // console.log(req.id); //article is not populated to is returns object id so we need to use _id
            //  console.log(article.author.id);// we can use id when we have _id then it converts _id to id string
            if(req.id != article.author._id){
                return res.send("unauthorized action");
            }
        }

        article.title = title;
        article.content = content;
        article.category = category;
        if(req.file){
            article.image = req.file.filename;
        }
        await article.save();
        res.redirect("/admin/article");

    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteArticle = async (req,res)=>{
    const id = req.params.id;
    try{
        const article = await News.findById(id);
        if(!article){
            return res.status(404).send("article not found");
        }
        if(req.role == "author"){
            if(req.id != article.author._id){
                return res.send("unauthorized action");
            }
        }
        if(article.image){
            const filepath = path.join("./public/uploads",article.image); // here path.join need actual path of folder
            console.log(filepath)
            fs.unlink(filepath,(err)=>{
                if(err) console.log("failed to delete image");
            })
        }
        await article.deleteOne();

        res.json({success:true})
    }catch(error){
        res.status(500).send("internal server error");
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
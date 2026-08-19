import News from "../models/News.js"
import Category from "../models/Category.js"
import User from "../models/User.js"


const allArticle = async (req,res)=>{
    res.render('admin/articles/index',{role:req.role})
}
const addArticlePage = async (req,res)=>{
    res.render('admin/articles/create',{role:req.role})
}
const addArticle = async (req,res)=>{}
const updateArticlePage = async (req,res)=>{
    res.render('admin/articles/update',{role:req.role})
}
const updateArticle = async (req,res)=>{}
const deleteArticle = async (req,res)=>{}

export default {
    allArticle,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle,
}
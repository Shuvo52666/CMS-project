import mongoose from "mongoose";

import Category from "../models/Category.js"
import Comment from "../models/Comment.js"
import News from "../models/News.js"
import User from "../models/User.js"

const index = async (req,res)=>{
    const articles = await News.find()
                                .populate('category',{"name":1,"slug":1})
                                .populate('author','fullname')
                                .sort({createdAt:-1})
    const categoriesInUse = await News.distinct('category');
    const categories = await Category.find({'_id':{$in:categoriesInUse}});
    // res.json({articles,categoriesInUse})                            
    // res.json(news);                            
    res.render('index.ejs',{articles,categories});
}
const articleByCategories = async (req,res)=>{
    const category = await Category.findOne({slug:req.params.name});
    if(!category){
        return res.send('category not found');
    }
    const articles = await News.find({category:category._id})
                                .populate('category',{"name":1,"slug":1})
                                .populate('author','fullname')
                                .sort({createdAt:-1})
    const categoriesInUse = await News.distinct('category');
    const categories = await Category.find({'_id':{$in:categoriesInUse}});
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('category',{category,articles,categories});
}
const singleArticle = async (req,res)=>{
    const article = await News.findOne({_id:req.params.id})
                                .populate('category',{"name":1,"slug":1})
                                .populate('author','fullname')
                                .sort({createdAt:-1})
    const categoriesInUse = await News.distinct('category');
    const categories = await Category.find({'_id':{$in:categoriesInUse}});
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('single',{article,categories})
}
const search = async (req,res)=>{
    const searchQuery = req.query.search;
    const articles = await News.find({
        $or:[
            {title:{$regex:searchQuery,$options:'i'}},
            {content:{$regex:searchQuery,$options:'i'}}
        ]
    })
        .populate('category',{"name":1,"slug":1})
        .populate('author','fullname')
        .sort({createdAt:-1})
    const categoriesInUse = await News.distinct('category');
    const categories = await Category.find({'_id':{$in:categoriesInUse}});
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('search.ejs',{searchQuery,articles,categories});
}
const author = async (req,res)=>{
    const author = await User.findOne({_id:req.params.id});
    if(!author){
        return res.send('author not found');
    }

    const articles = await News.find({author:req.params.id})
                                .populate('category',{"name":1,"slug":1})
                                .populate('author','fullname')
                                .sort({createdAt:-1})
    const categoriesInUse = await News.distinct('category');
    const categories = await Category.find({'_id':{$in:categoriesInUse}});
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('author',{author,articles,categories})
}
const addComment = async (req,res)=>{}

export default {
    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment
}
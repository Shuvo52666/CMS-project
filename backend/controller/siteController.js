import mongoose from "mongoose";
import Settings from "../models/Settings.js"
import Category from "../models/Category.js"
import Comment from "../models/Comment.js"
import News from "../models/News.js"
import User from "../models/User.js"
import paginate from "../utils/paginate.js"
import { populate } from "dotenv";

const index = async (req,res)=>{
    // const articles = await News.find()
    //                             .populate('category',{"name":1,"slug":1})
    //                             .populate('author','fullname')
    //                             .sort({createdAt:-1})

    const paginatedNews = await paginate(News,{},
                                        req.query,
                                        {
                                        populate:[
                                            {path:'category',select:'name slug'},
                                            {path:'author',select:'fullname'}
                                        ],
                                        sort:'-createdAt'
                                        })

    // res.json({articles,categoriesInUse,latestNews,settings})                            
    // res.json({paginatedNews});                            
    res.render('index.ejs',{paginatedNews,query:req.query});
}
const articleByCategories = async (req,res)=>{
    const category = await Category.findOne({slug:req.params.name});
    if(!category){
        return res.send('category not found');
    }
    // const articles = await News.find({category:category._id})
    //                             .populate('category',{"name":1,"slug":1})
    //                             .populate('author','fullname')
    //                             .sort({createdAt:-1})
    const paginatedNews = await paginate(News,{category:category._id},
                                        req.query,
                                        {
                                        populate:[
                                            {path:'category',select:'name slug'},
                                            {path:'author',select:'fullname'}
                                        ],
                                        sort:'-createdAt'
                                        })
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('category',{category,paginatedNews,query:req.query});
}
const singleArticle = async (req,res)=>{
    const article = await News.findOne({_id:req.params.id})
                                .populate('category',{"name":1,"slug":1})
                                .populate('author','fullname')
                                .sort({createdAt:-1})
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('single',{article})
}
const search = async (req,res)=>{
    const searchQuery = req.query.search;
    // const articles = await News.find({
    //     $or:[
    //         {title:{$regex:searchQuery,$options:'i'}},
    //         {content:{$regex:searchQuery,$options:'i'}}
    //     ]
    // })
    //     .populate('category',{"name":1,"slug":1})
    //     .populate('author','fullname')
    //     .sort({createdAt:-1})
    const paginatedNews = await paginate(News,{
                                                $or:[
                                                        {title:{$regex:searchQuery,$options:'i'}},
                                                        {content:{$regex:searchQuery,$options:'i'}}
                                                    ]
                                                },
                                        req.query,
                                        {
                                        populate:[
                                            {path:'category',select:'name slug'},
                                            {path:'author',select:'fullname'}
                                        ],
                                        sort:'-createdAt'
                                        })
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('search.ejs',{searchQuery,paginatedNews,query:req.query});
}
const author = async (req,res)=>{
    const author = await User.findOne({_id:req.params.id});
    if(!author){
        return res.send('author not found');
    }

    // const articles = await News.find({author:req.params.id})
    //                             .populate('category',{"name":1,"slug":1})
    //                             .populate('author','fullname')
    //                             .sort({createdAt:-1})
    const paginatedNews = await paginate(News,{author:req.params.id},
                                        req.query,
                                        {
                                        populate:[
                                            {path:'category',select:'name slug'},
                                            {path:'author',select:'fullname'}
                                        ],
                                        sort:'-createdAt'
                                        })
    // res.json({articles,categoriesInUse})                            
    // res.json(news);
    res.render('author',{author,articles,query:req.query})
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
import mongoose from "mongoose";

import Category from "../models/Category.js"
import Comment from "../models/Comment.js"
import News from "../models/News.js"
import User from "../models/User.js"

const index = async (req,res)=>{}
const articleByCategories = async (req,res)=>{}
const singleArticle = async (req,res)=>{}
const search = async (req,res)=>{}
const author = async (req,res)=>{}
const addComment = async (req,res)=>{}

export default {
    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment
}
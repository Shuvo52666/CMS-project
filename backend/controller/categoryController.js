import Category from "../models/Category.js"


const allCategory = async (req,res)=>{
    res.render('admin/categories/index')
}
const addCategoryPage = async (req,res)=>{
    res.render('admin/categories/create')
}
const addCategory = async (req,res)=>{}
const updateCategoryPage = async (req,res)=>{
    res.render('admin/categories/update')
}
const updateCategory = async (req,res)=>{}
const deleteCategory = async (req,res)=>{}

export default {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory,
}

import Category from "../models/Category.js"


const allCategory = async (req,res)=>{
    const category = await Category.find();
    try {
        res.render('admin/categories/index',{category,role:req.role})
    } catch (error) {
        res.status(400).send(error);
    }
}
const addCategoryPage = async (req,res)=>{
    res.render('admin/categories/create',{role:req.role})
}
const addCategory = async (req,res)=>{
    try {
        await Category.create(req.body);
        res.redirect('/admin/category');
    } catch (error) {
        res.status(400).send(error);
    }
}
const updateCategoryPage = async (req,res)=>{
    res.render('admin/categories/update',{role:req.role})
}
const updateCategory = async (req,res)=>{}
const deleteCategory = async (req,res)=>{
    const id = req.params.id
    try {
        const category = await Category.findByIdAndDelete(id)
        if(!category){
            return res.status(404).send("user not found");
        }
        res.json({success:true})
    } catch (error) {
        res.status(500).send("internal server error");
    }
}

export default {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory,
}

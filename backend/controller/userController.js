import User from "../models/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const loginPage = async (req,res)=>{
    res.render('admin/login',{
        layout:false
    });
}
const adminlogin = async (req,res)=>{
    const {username,password}= req.body;
    try {
        const user = await User.findOne({username});

        if(!user){
            return res.status(401).send('invalid username or password')
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).send('invalid username or password')
        }

        const jwtData = {
            id:user._id,
            fullname:user.fullname,
            role:user.role
        };

        const accessToken = jwt.sign(jwtData,process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie('token',accessToken,{
            httpOnly:true,
            maxAge:60*60*1000,
        })

        res.redirect('/admin/dashboard');



    } catch (error) {
        console.log(error.message);
    }
}
const logout = async (req,res)=>{
    res.clearCookie('token');
    res.redirect('/admin')
}
const dashboard = async (req,res)=>{
    res.render('admin/dashboard',{role:req.role, fullname:req.fullname});
}
const settings = async (req,res)=>{
    res.render('admin/settings',{role:req.role});
}

const allUser = async (req,res)=>{
    const users = await User.find().select("-password"); //lean convert users a plain JavaScript array. 
    res.render('admin/users/index',{users,role:req.role});
}
const addUserPage = async (req,res)=>{
    res.render('admin/users/create',{role:req.role});
}
const addUser = async (req,res)=>{
    await User.create(req.body);
    res.redirect('/admin/users')
}
const updateUserPage = async (req,res)=>{
    try{
        const id = req.params.id
        const user = await User.findById(id);
        // console.log(user);
        if(!user){
            return res.status(404).send('user not found')
        }
        res.render('admin/users/update',{user,role:req.role});
    }catch(err){
        console.error(err);
        res.status(500).send("internal server error");
    }
}
const updateUser = async (req,res)=>{
    const id = req.params.id;
    const {fullname,password,role} = req.body;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send("user not found");
        }
        user.fullname = fullname || user.fullname;
        if(password){
            user.password = password
        }
        user.role = role || user.role;

        await user.save();

        res.redirect('/admin/users');
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error");
    }
}
const deleteUser = async (req,res)=>{
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(500).send("user not found");
        }
        res.json({success:true})
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error");
    }
}

export default {
    loginPage,
    adminlogin,
    logout,
    allUser,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
    dashboard,
    settings
}

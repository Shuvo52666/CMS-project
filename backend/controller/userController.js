import User from "../models/User.js"


const loginPage = async (req,res)=>{
    res.render('admin/login',{
        layout:false
    });
}
const adminlogin = async (req,res)=>{}
const logout = async (req,res)=>{}
const dashboard = async (req,res)=>{
    res.render('admin/dashboard');
}
const settings = async (req,res)=>{
    res.render('admin/settings');
}

const allUser = async (req,res)=>{
    const users = await User.find().select("-password"); //lean convert users a plain JavaScript array. 
    res.render('admin/users/index',{users});
}
const addUserPage = async (req,res)=>{
    res.render('admin/users/create');
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
        res.render('admin/users/update',{user});
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

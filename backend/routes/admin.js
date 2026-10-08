import express from "express";
import userController from "../controller/userController.js";
import categoryController from "../controller/categoryController.js";
import articleController from "../controller/articleController.js";
import commentController from "../controller/commentController.js";
import isLoggedIn from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../middleware/multer.js";
import isValid from "../middleware/validation.js"

const router = express.Router();

//login route
router.get("/",userController.loginPage);
router.post("/login",isValid.loginValidation,userController.adminlogin);
router.get("/logout",userController.logout);
router.get("/dashboard",isLoggedIn, userController.dashboard);
router.get("/settings" ,isLoggedIn,isAdmin,userController.settings);
router.post("/saveSettings",isLoggedIn,isAdmin,upload.single('website_logo'),userController.saveSettings)

//user crud route
router.get('/users',isLoggedIn,isAdmin, userController.allUser);
router.get('/addUser',isLoggedIn,isAdmin, userController.addUserPage);
router.post('/addUser',isLoggedIn,isAdmin, isValid.userValidation, userController.addUser);
router.get('/updateUser/:id',isLoggedIn,isAdmin, userController.updateUserPage);
router.post('/updateUser/:id',isLoggedIn,isAdmin,isValid.userUpdateValidation, userController.updateUser);
router.delete('/deleteUser/:id',isLoggedIn,isAdmin, userController.deleteUser);

//category crud route
router.get('/category',isLoggedIn,isAdmin, categoryController.allCategory);
router.get('/addCategory',isLoggedIn,isAdmin, categoryController.addCategoryPage);
router.post('/addCategory',isLoggedIn,isAdmin,isValid.categoryValidation, categoryController.addCategory);
router.get('/updateCategory/:id',isLoggedIn,isAdmin, categoryController.updateCategoryPage);
router.post('/updateCategory/:id',isLoggedIn,isAdmin,isValid.categoryValidation, categoryController.updateCategory);
router.delete('/deleteCategory/:id',isLoggedIn,isAdmin, categoryController.deleteCategory);

//Article crud route
router.get('/article',isLoggedIn, articleController.allArticle);
router.get('/addArticle',isLoggedIn, articleController.addArticlePage);
router.post('/addArticle',isLoggedIn,upload.single("image"),isValid.articleValidation,articleController.addArticle); //the value of single will be the input field name
router.get('/updateArticle/:id',isLoggedIn, articleController.updateArticlePage);
router.post('/updateArticle/:id',isLoggedIn,upload.single("image"),isValid.articleValidation, articleController.updateArticle);
router.delete('/deleteArticle/:id',isLoggedIn, articleController.deleteArticle);

//comments route
router.get('/comments',isLoggedIn, commentController.allComments);
router.put('/update-comment-status/:id',isLoggedIn, commentController.updateCommentStatus);
router.delete('/delete-comment/:id',isLoggedIn, commentController.deleteComment);


//404 route

router.use(isLoggedIn,(req,res,next)=>{
    res.status(404).render("admin/404",{
        message:'page not found',
        role:req.role
    })
})

router.use(isLoggedIn,(err,req,res,next)=>{
    console.error(err.stack);
    const status = err.status || 500;
    const view = status === 404 ? 'admin/404' : 'admin/500';
    res.status(status).render(view,{
        message:err.message || "something wents wrong",
        role:req.role
    })
})

// router.use(isLoggedIn,(err,req,res,next)=>{
//     console.error(err.stack);
//     res.status(500).render("admin/500",{
//         message:err.message || "internal server error",
//         role:req.role
//     })
// })




export default router;

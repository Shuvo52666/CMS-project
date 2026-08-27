import express from "express";
import userController from "../controller/userController.js";
import categoryController from "../controller/categoryController.js";
import articleController from "../controller/articleController.js";
import commentController from "../controller/commentController.js";
import isLoggedIn from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import upload from "../middleware/multer.js";

const router = express.Router();

//login route
router.get("/",userController.loginPage);
router.post("/login",userController.adminlogin);
router.get("/logout",userController.logout);
router.get("/dashboard",isLoggedIn, userController.dashboard);
router.get("/settings" ,isLoggedIn,isAdmin,userController.settings)

//user crud route
router.get('/users',isLoggedIn,isAdmin, userController.allUser);
router.get('/addUser',isLoggedIn,isAdmin, userController.addUserPage);
router.post('/addUser',isLoggedIn,isAdmin, userController.addUser);
router.get('/updateUser/:id',isLoggedIn,isAdmin, userController.updateUserPage);
router.post('/updateUser/:id',isLoggedIn,isAdmin, userController.updateUser);
router.delete('/deleteUser/:id',isLoggedIn,isAdmin, userController.deleteUser);

//category crud route
router.get('/category',isLoggedIn,isAdmin, categoryController.allCategory);
router.get('/addCategory',isLoggedIn,isAdmin, categoryController.addCategoryPage);
router.post('/addCategory',isLoggedIn,isAdmin, categoryController.addCategory);
router.get('/updateCategory/:id',isLoggedIn,isAdmin, categoryController.updateCategoryPage);
router.post('/updateCategory/:id',isLoggedIn,isAdmin, categoryController.updateCategory);
router.delete('/deleteCategory/:id',isLoggedIn,isAdmin, categoryController.deleteCategory);

//Article crud route
router.get('/article',isLoggedIn, articleController.allArticle);
router.get('/addArticle',isLoggedIn, articleController.addArticlePage);
router.post('/addArticle',isLoggedIn,upload.single("image"),articleController.addArticle); //the value of single will be the input field name
router.get('/updateArticle/:id',isLoggedIn, articleController.updateArticlePage);
router.post('/updateArticle/:id',isLoggedIn,upload.single("image"), articleController.updateArticle);
router.delete('/deleteArticle/:id',isLoggedIn, articleController.deleteArticle);

//comments route
router.get('/comments',isLoggedIn, commentController.allComments);


export default router;

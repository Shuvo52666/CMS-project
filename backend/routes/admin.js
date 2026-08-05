import express from "express";
import userController from "../controller/userController.js";
import categoryController from "../controller/categoryController.js";
import articleController from "../controller/articleController.js";
import commentController from "../controller/commentController.js";


const router = express.Router();

//login route
router.get("/",userController.loginPage);
router.post("/login",userController.adminlogin);
router.get("/logout",userController.logout);
router.get("/dashboard",userController.dashboard);
router.get("/settings",userController.settings)

//user crud route
router.get('/users',userController.allUser);
router.get('/addUser',userController.addUserPage);
router.post('/addUser',userController.addUser);
router.get('/updateUser/:id',userController.updateUserPage);
router.post('/updateUser/:id',userController.updateUser);
router.delete('/deleteUser/:id',userController.deleteUser);

//category crud route
router.get('/category',categoryController.allCategory);
router.get('/addCategory',categoryController.addCategoryPage);
router.post('/addCategory',categoryController.addCategory);
router.get('/updateCategory/:id',categoryController.updateCategoryPage);
router.post('/updateCategory/:id',categoryController.updateCategory);
router.delete('/deleteCategory/:id',categoryController.deleteCategory);

//Article crud route
router.get('/article',articleController.allArticle);
router.get('/addArticle',articleController.addArticlePage);
router.post('/addArticle',articleController.addArticle);
router.get('/updateArticle/:id',articleController.updateArticlePage);
router.post('/updateArticle/:id',articleController.updateArticle);
router.delete('/deleteArticle/:id',articleController.deleteArticle);

//comments route
router.get('/comments',commentController.allComments);


export default router;

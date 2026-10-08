import express from "express";
import siteController from "../controller/siteController.js";
import loadCommonData from "../middleware/loadCommonData.js";

const router = express.Router();

router.use(loadCommonData)

router.get("/",siteController.index);
router.get("/category/:name",siteController.articleByCategories);
router.get("/single/:id",siteController.singleArticle);
router.get("/search",siteController.search);
router.get("/author/:id",siteController.author);
router.post("/single/:id/comment",siteController.addComment);

export default router;

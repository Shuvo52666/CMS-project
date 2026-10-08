import Comment from "../models/Comment.js"
import createError from "../utils/error.js"
import News from "../models/News.js";
const allComments = async (req,res,next)=>{

    try {
        let comments;
        if(req.role === 'admin'){
            comments = await Comment.find()
                                    .populate('article','title')
                                    .sort({createdAt:-1});
        }else{
            const news = await News.find({author:req.id});
            const newsIds = news.map(news => news._id);
            comments = await Comment.find({article:{$in:newsIds}})
                                    .populate('article','title')
                                    .sort({createdAt:-1}); 
        }
        // res.json(comments) 
        res.render('admin/comments/index',{comments,role:req.role})                            
    } catch (error) {
        next(createError("error fetching comments",500))
    }
        
                                  
    // res.render('admin/comments/index',{role:req.role})
}
const updateCommentStatus = async (req,res,next)=>{
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id,{status:req.body.status},{ returnDocument: 'after' })
        if(!comment){
            return next(createError('comment not found',404))
        }
        res.json({success:true})
    } catch (error) {
        return next(createError("error updating comment status",500))
    }
    // res.render('admin/comments/index',{role:req.role})
}
const deleteComment = async (req,res,next)=>{
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)
        if(!comment){
            return next(createError('comment not found',404))
        }
        res.json({success:true})
    } catch (error) {
        return next(createError("error deleting comment",500))
    }
    // res.render('admin/comments/index',{role:req.role})
}

export default {
    allComments,
    updateCommentStatus,
    deleteComment
}
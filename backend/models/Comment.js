import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    article:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'News',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending',
        required:true
    }
});

const Comment = mongoose.model('Comments',CommentSchema);
export default Comment;
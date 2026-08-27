import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const NewsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',//ref will be the model name of the collection of category schema
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',//ref will be the model name of the collection of user schema
        required:true
    },
    image:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

NewsSchema.plugin(mongoosePaginate);

const News = mongoose.model('news',NewsSchema);
export default News;
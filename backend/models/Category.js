import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    timestamps:{
        type:Date,
        default:Date.now
    }

});

CategorySchema.pre('save',function(next){
    this.slug = slugify(this.name,{lower:true});
    next();
})

const Category = mongoose.model('categories',CategorySchema);
export default Category;
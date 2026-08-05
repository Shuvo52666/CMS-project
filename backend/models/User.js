import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['author','admin'],
        default:'author',
        requierd:true
    }
});

// UserSchema.pre('save',async function(next){ arow function do not have (this) so here need to use function
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password,12);
//     }
//     next(); next is not a function for async
// })
UserSchema.pre("save",async function(next){ 

        if(!this.isModified('password')){
            return;
        }
        this.password = await bcrypt.hash(this.password,12);
})


const User = mongoose.model('users',UserSchema);
export default User
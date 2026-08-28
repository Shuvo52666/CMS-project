import mongoose, { mongo } from "mongoose";

const SettingSchema = new mongoose.Schema({
    website_title:{
        type:String,
        required:true
    },
    website_logo:{
        type:String
    },
    footer_desc:{
        type:String,
        requied:true
    }
})

const Settings = mongoose.model("settings",SettingSchema);
export default Settings;
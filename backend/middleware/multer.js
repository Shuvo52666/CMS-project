import multer from "multer";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,"../public/uploads"));
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const filter = (req,file,cb)=>{
    if(file.mimetype === "image/jpg" || file.mimetype === "image/png"|| file.mimetype === "image/jpeg"){
        cb(null,true);
    }else{
        cb(new Error('only jpg and png are allowed'),false);
    }
};

const upload = multer({
    storage:storage,
    fileFilter:filter,
    limits:{
        fileSize:1024*1024*5
    }
})

export default upload;
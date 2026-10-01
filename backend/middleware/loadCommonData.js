import Category from "../models/Category.js"
import News from "../models/News.js"
import Settings from "../models/Settings.js"

const loadCommonData = async (req,res,next)=>{
    try {
        const latestNews = await News.find()
                                    .populate('category',{"name":1,"slug":1})
                                    .populate('author','fullname')
                                    .sort({createdAt:-1}).limit(5)
        const settings = await Settings.findOne();
        const categoriesInUse = await News.distinct('category');
        const categories = await Category.find({'_id':{$in:categoriesInUse}});

        res.locals.settings = settings
        res.locals.latestNews = latestNews
        res.locals.categories = categories

        next()
    } catch (error) {
        next();
    }
}

export default loadCommonData
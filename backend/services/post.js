const Post = require("../models/post");
 const POST_PER_PAGE = 10;

 const apiGetPostByPage = async (page, key) => {

   try {
     let totalItems = await Post.countDocuments();
     let totalPages = Math.ceil(totalItems / POST_PER_PAGE);
     let data = await Post
         .find()
         .populate('author')
         .skip((page - 1) * POST_PER_PAGE)
         .limit(POST_PER_PAGE)
         .exec()

     if(key) {
         data = data.filter((item) => item.title.includes(key))
         totalItems = data.length
         totalPages = Math.ceil(totalItems / POST_PER_PAGE)
     }


     if (!data) {
       res.status(404).json({ error: 'No document found' })
       return;
     }

     res.json({
       data,
       currentPage: page,
       totalItems,
       totalPages,
     });
   } catch (error) {
     res.status(500).json({ error: error });
   }
 };

 module.exports = {apiGetPostByPage}; 
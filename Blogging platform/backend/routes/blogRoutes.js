const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads

router.use(fileUpload());

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.post('/:blogId/comments', blogController.createComment);
router.get('/:blogId/comments', blogController.getCommentsByBlog);
router.post('/:id/like', blogController.likeBlog);
router.post('/:id/dislike', blogController.dislikeBlog);
router.get('/:blogId/likes', blogController.getLikesAndDislikes);
router.get('/search', blogController.searchBlogs);
router.post('/upload', blogController.uploadImage); // Add this line

module.exports = router;
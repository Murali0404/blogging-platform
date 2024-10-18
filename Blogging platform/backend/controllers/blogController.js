const Blog = require('../model/Blog');
const Comment = require('../model/Comment');
const Like = require('../model/Like');
const supabase = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const { title, small_description, content, img, posted_by } = req.body;
  const newBlog = new Blog({ title, small_description, content, img, posted_by });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
  const { title, small_description, content, img, posted_by } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, small_description, content, img, posted_by },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createComment = async (req, res) => {
  const { comment, posted_by, blog } = req.body;
  const newComment = new Comment({ comment, posted_by, blog });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate('posted_by', 'name');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.likes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dislike a blog post
const dislikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.dislikes += 1;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get likes and dislikes for a blog post
const getLikesAndDislikes = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ likes: blog.likes, dislikes: blog.dislikes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchBlogs = async (req, res) => {
  const { query } = req.query;
  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const uploadImage = async (req, res) => {
  const { img } = req.files;
  // console.log(req) 

  if (!img) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  const imageName = `${uuidv4()}-${img.name}`;

  try {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(imageName, img.data, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const publicURL  = supabase.storage.from('images').getPublicUrl(data.path);

    res.status(200).json({ imageUrl: publicURL.data.publicURL });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  getCommentsByBlog,
  likeBlog,
  dislikeBlog,
  getLikesAndDislikes,
  searchBlogs,
  uploadImage,
};
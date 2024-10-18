// src/components/Blog/BlogList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blog.css';

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://blogverse-n0e2.onrender.com/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      <h2>All Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.small_description}</p>
            <img src={blog.img} alt={blog.title} />
            <p>Posted by: {blog.posted_by}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Auth.css';

function Profile() {
  const [profile, setProfile] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://blogverse-n0e2.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data.user);
        setBlogs(response.data.blogs);
        setBio(response.data.user.bio || '');
      } catch (error) {
        setError('Failed to fetch profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('https://blogverse-n0e2.onrender.com/api/users/profile', { bio }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProfile(response.data);
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (error) {
      setError('Failed to update profile.');
      setSuccess('');
    }
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        <button onClick={() => window.history.back()}>Back</button>
        <button onClick={() => window.location.href = '/write'}>Write</button>
      </nav>
      <div className="profile-header">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-image" />
        <div className="profile-info">
          <h2>{profile.username}</h2>
          <div className="stats">
            <span><strong>{blogs.length}</strong> posts</span>
            <span><strong>200k</strong> likes</span>
            <span><strong>100k</strong> following</span>
          </div>
        </div>
      </div>
      <div className="profile-bio">
        <form onSubmit={handleUpdateProfile}>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
      <div className="profile-blogs">
        <h3>Your Blogs</h3>
        <ul>
          {blogs.map(blog => (
            <li key={blog._id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
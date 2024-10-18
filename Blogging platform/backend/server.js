const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi')
require('dotenv').config();

const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
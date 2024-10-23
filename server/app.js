const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const Route = require('./routes/route');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();

// Kết nối cơ sở dữ liệu MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);

// Cấu hình để express có thể phục vụ các file trong thư mục "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', Route);

// Khởi động server
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

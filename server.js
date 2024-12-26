const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());
app.use(morgan('dev')); // Logging
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routers/api'));
app.use('/api/v1', require('./src/routers/api'));

// Error handling
app.use(require('./src/middlewares/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

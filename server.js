const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const limiter = require('./src/middleware/rateLimiter');
const logger = require('./src/utils/logger');

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());
app.use(morgan('dev')); // Logging
app.use(express.json());
app.use(limiter);
// Routes
app.use('/api/auth', require('./src/routers/api'));
app.use('/api/v1', require('./src/routers/api'));

// Error handling
app.use(require('./src/middlewares/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

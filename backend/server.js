const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------
// Security Middleware
// ---------------------

// Set secure HTTP headers (XSS protection, HSTS, content-type sniffing, etc.)
app.use(helmet());

// Gzip compress all responses
app.use(compression());

// Rate limiter: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// CORS – allow all origins in development, restrict in production
const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (health checks, curl, etc.)
        if (!origin) return callback(null, true);
        // If FRONTEND_URL is set, enforce origin whitelist
        if (process.env.FRONTEND_URL && allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('Not allowed by CORS'));
        }
        // In development (no FRONTEND_URL set), allow all origins
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// ---------------------
// Routes
// ---------------------
const apiRoutes = require('./routes/index');
app.use('/api', apiRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'AgriConnect API is running' });
});

// ---------------------
// Global Error Handler
// ---------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

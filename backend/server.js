import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cookie parser middleware (allow us to use req.cookies, req.cookies.name)
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));

// Make uploads/ folder static
const __dirname = path.resolve(); // set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === "production") {
    // /frontend/build will be created when we run npm build
    // Make the folder static
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    // any route that is not an api will be directed to index.html
    app.get("*", (req, res) => {
        res.sendFile(__dirname, "frontend", "build", "index.html");
    });
} else {
    app.get('/', (req, res) => {
        res.send("API is running...");
    });
}

// route not founded
app.use(notFound);

// middleware of errorHandler(err, req, res, next)
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
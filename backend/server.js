// const express = require('express'); old way
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
dotenv.config();
import path from 'path';
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/products",productRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/frontend/dist')));
    
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on http://localhost:'+PORT);
});

// lelloulsaikrishna
// bbV7TKMJzfo2upPX


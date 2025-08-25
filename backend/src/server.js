import express from 'express';
import dotenv from 'dotenv';
import notesRouter from './routes/notes.routes.js';
import connectDB from './configs/db.js';

dotenv.config();
const PORT = process.env.PORT || 13000;

const app = express();
connectDB();
// Middleware to parse JSON bodies
app.use(express.json());


// Routes
app.use("/api/v1/notes", notesRouter);

app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to the Notes API" });
});

app.listen(PORT, (req, res, next) => {
    console.log(`Server is running on port ${PORT}`);
});
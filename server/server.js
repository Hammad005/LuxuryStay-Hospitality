import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import connectDB from "./database/dbConnection.js";
import staffRoute from './routes/staffRoute.js';
import guestRoute from './routes/guestRoute.js';
import roomRoute from './routes/roomRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import messageRoute from "./routes/messageRoute.js"
import authRoute from './routes/authRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import checkInRoute from './routes/checkInRoute.js';
import checkOutRoute from './routes/checkOutRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use('/api/Auth', authRoute);
app.use('/api/staffAuth', staffRoute);
app.use('/api/guest', guestRoute);
app.use('/api/room', roomRoute);
app.use('/api/service', serviceRoute);
app.use('/api/message', messageRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/checkIn', checkInRoute);
app.use('/api/checkOut', checkOutRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDB();
});

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./rout/userRout");

dotenv.config();
const app = express();

app.use(cookieParser());

app.use(cors({
    origin: ['https://zs-shop.vercel.app/', 'http://localhost:5173/'], // Replace with your frontend's domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials such as cookies
}));


app.use(express.json());
app.use(userRouter);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log("App running on port", process.env.PORT);
});

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
    origin: "http://localhost:5173/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(userRouter);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log("App running on port", process.env.PORT);
});

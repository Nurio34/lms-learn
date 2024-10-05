require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const CLIENT_URL = process.env.CLIENT_URL;
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const AuthRouter = require("./routers/auth");

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: CLIENT_URL,
        methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);

app.use("/", AuthRouter);

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Database connected Successfully..."))
    .catch((e) => console.log("Error while Database-Connection"));

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

import express from "express";
import MainRouter from "./routes/index.js";

const router = express();

app.use("api/v1", MainRouter);

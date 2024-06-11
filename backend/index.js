import express from "express";
import MainRouter from "./routes/index.js";
import cors from "cors";

app.use(cors());
app.use(express.json());
const app = express();

app.use("api/v1", MainRouter);

app.listen(3000, "Database is connected to the port 3000");

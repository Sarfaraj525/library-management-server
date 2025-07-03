import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import { errorHandler } from "./app/middlewares/errorHandler";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

const whiteList = process.env.WHITE_LIST_ORIGINS;

app.use(
  cors({
    origin: [...(whiteList ? whiteList.split(",") : [])],
  })
);

app.use(express.json());

app.use("/api", booksRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log({ req, res });
  res.send("Hello Welcome to Library Management System!");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;

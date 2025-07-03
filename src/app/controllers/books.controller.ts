import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
export const booksRoutes = express.Router();

booksRoutes.post("/books", async (req: Request, res: Response) => {
  
  const body = req.body;

  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    book,
  });
});
booksRoutes.get("/books", async (req: Request, res: Response) => {
  const books = await Book.find();

  res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    books,
  });
});
booksRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);

  res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    book,
  });
});
booksRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;
  console.log({ updatedBody });
  const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

  res.status(201).json({
    success: true,
    message: "Book updated successfully",
    book,
  });
});
booksRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;

  const book = await Book.findByIdAndDelete(bookId);

  res.status(201).json({
    success: true,
    message: "Book deleted successfully",
    book,
  });
});

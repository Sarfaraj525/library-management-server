import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";

export const borrowRoutes = express.Router();

// POST /api/borrow
borrowRoutes.post(
  "/borrow",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { book: bookId, quantity, dueDate } = req.body;

      const book = await Book.findById(bookId);
      if (!book) {
        res.status(404).json({ success: false, message: "Book not found" });
        return;
      }

      // @ts-ignore - using instance method
      await book.decrementCopies(quantity);

      const borrowRecord = await Borrow.create({
        book: bookId,
        quantity,
        dueDate,
      });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: (error as Error).message });
    }
  }
);

// GET /api/borrow (summary)
borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: "$book",
        totalQuantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "bookDetails",
      },
    },
    {
      $unwind: "$bookDetails",
    },
    {
      $project: {
        _id: 0,
        book: {
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
        },
        totalQuantity: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: summary,
  });
});

import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: String,
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

// Instance method
bookSchema.methods.decrementCopies = async function (quantity: number) {
  if (this.copies < quantity) throw new Error("Not enough copies available");
  this.copies -= quantity;
  if (this.copies === 0) this.available = false;
  await this.save();
};

export const Book = model("Book", bookSchema);

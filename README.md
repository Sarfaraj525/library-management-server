📚 Library Management System API
A simple RESTful API to manage books and borrowing functionality in a library. Built with Node.js, Express, TypeScript, and MongoDB.

🚀 Features
✅ Create, Read, Update, Delete Books

✅ Borrow a Book with quantity validation

✅ Summary of all Borrowed Books using aggregation

✅ Error handling for validation, 404s, and server issues

🛠️ Tech Stack
Node.js

Express

TypeScript

MongoDB + Mongoose

Postman (for testing)

📦 Installation process:

--> Have to start terminal and install all dependencies and Devdependencies with "npm i..."
--> Create a .env file in the root directory
--> Run the server with "npm run dev"

API Endpoints
✅ Root
GET /
Response: "Hello Welcome to Library Management System!"

📘 Books
➕ Create a Book
POST /api/books

{
  "title": "1984",
  "author": "George Orwell",
  "genre": "FICTION",
  "isbn": "9780451524935",
  "description": "A dystopian novel",
  "copies": 5
}
📖 Get All Books
GET /api/books

🔍 Get Book by ID
GET /api/books/:bookId

📝 Update Book
PATCH /api/books/:bookId

{
  "copies": 10
}
❌ Delete Book
DELETE /api/books/:bookId

🔄 Borrowing
📥 Borrow a Book
POST /api/borrow

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
❗ Validates if the book exists

❗ Verifies available quantity

✅ Deducts copies and updates availability status

✅ Saves the borrow record

Success Response:

{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "...",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
📊 Borrowed Books Summary
GET /api/borrow

Aggregates total quantity borrowed for each book.

Success Response:

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 5
    }
  ]
}
🛡️ Error Handling
400: Validation errors

404: Not found (routes or book IDs)

500: Server errors

📬 Contact
Maintained by Sarfaraj Nawaz Chowdhury
GitHub: Sarfaraj525


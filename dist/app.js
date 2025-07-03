"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const errorHandler_1 = require("./app/middlewares/errorHandler");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'https://library-management-client-three.vercel.app', credentials: true }));
app.use(express_1.default.json());
app.use("/api", books_controller_1.booksRoutes);
app.use("/api", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    console.log({ req, res });
    res.send("Hello Welcome to Library Management System!");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
app.use(errorHandler_1.errorHandler);
exports.default = app;

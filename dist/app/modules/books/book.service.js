"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const uuid_1 = require("uuid");
const error_1 = require("../../utils/error");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const getBookById = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, uuid_1.validate)(bookId)) {
        throw new error_1.BadRequestError(`Invalid book ID format. Please provide a valid UUID.`);
    }
    const book = yield prisma_1.default.book.findUnique({
        where: { bookId },
    });
    if (!book) {
        throw new error_1.NotFoundError(`Sorry, the book with ID ${bookId} could not be found. Please check the ID and try again.`);
    }
    return book;
});
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBook = yield prisma_1.default.book.findFirst({
        where: {
            title: payload.title,
        },
    });
    if (existingBook) {
        throw new error_1.ConflictError(`A book with the title ${payload.title} already exists.`);
    }
    const cretedBook = yield prisma_1.default.book.create({
        data: {
            title: payload.title,
            genre: payload.genre,
            publishedYear: payload.publishedYear,
            totalCopies: payload.totalCopies,
            availableCopies: payload.availableCopies,
        },
    });
    return cretedBook;
});
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.default.book.findMany();
    if (books.length === 0) {
        throw new error_1.NotFoundError("No books found in the database.");
    }
    return books;
});
const getBookByIdFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // const book = await prisma.book.findUnique({
    //     where: { bookId },
    // });
    // return book;
    return yield getBookById(bookId);
});
const updateBookIntoDB = (bookId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield getBookById(bookId);
    const updatedBook = yield prisma_1.default.book.update({
        where: { bookId },
        data: {
            title: payload.title,
            genre: payload.genre,
            publishedYear: payload.publishedYear,
            totalCopies: payload.totalCopies,
            availableCopies: payload.availableCopies,
        },
    });
    return updatedBook;
});
const deleteBookFromDB = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    yield getBookById(bookId);
    const deletedBook = yield prisma_1.default.book.delete({
        where: { bookId },
    });
    return deletedBook;
});
exports.BookService = {
    createBook,
    getAllBooksFromDB,
    getBookByIdFromDB,
    updateBookIntoDB,
    deleteBookFromDB
};

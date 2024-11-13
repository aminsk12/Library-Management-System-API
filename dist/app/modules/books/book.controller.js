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
exports.BookController = void 0;
const book_service_1 = require("./book.service");
const http_status_codes_1 = require("http-status-codes");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAysnc_1 = __importDefault(require("../../shared/catchAysnc"));
const createBook = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.createBook(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Book created successfully",
        data: result,
    });
}));
const getAllBooksFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getAllBooksFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Books retrieved successfully",
        data: result,
    });
}));
const getBookByIdFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { bookId } = req.params;
    if (bookId.startsWith(":")) {
        bookId = bookId.substring(1);
    }
    const result = yield book_service_1.BookService.getBookByIdFromDB(bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Book retrieved successfully",
        data: result,
    });
}));
const updateBookIntoDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { bookId } = req.params;
    const payload = req.body;
    if (bookId.startsWith(":")) {
        bookId = bookId.substring(1);
    }
    const result = yield book_service_1.BookService.updateBookIntoDB(bookId, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Book updated successfully",
        data: result,
    });
}));
const deleteBookFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { bookId } = req.params;
    if (bookId.startsWith(":")) {
        bookId = bookId.substring(1);
    }
    yield book_service_1.BookService.deleteBookFromDB(bookId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Book successfully deleted",
    });
}));
exports.BookController = {
    createBook,
    getAllBooksFromDB,
    getBookByIdFromDB,
    updateBookIntoDB,
    deleteBookFromDB
};

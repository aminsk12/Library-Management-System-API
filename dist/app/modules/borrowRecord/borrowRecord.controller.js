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
exports.BorrowedBookController = void 0;
const catchAysnc_1 = __importDefault(require("../../shared/catchAysnc"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const borrowRecord_service_1 = require("./borrowRecord.service");
const borrowBookFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, memberId } = req.body;
    const result = yield borrowRecord_service_1.BorrowedBookService.borrowBookFromDB(bookId, memberId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Book borrowed successfully",
        data: result,
    });
}));
const returnBookFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.body;
    yield borrowRecord_service_1.BorrowedBookService.returnBookFromDB(borrowId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Book returned successfully",
    });
}));
const overDueBooks = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield borrowRecord_service_1.BorrowedBookService.overdueBooksCheck();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: result.message,
        data: result.data,
    });
}));
exports.BorrowedBookController = {
    borrowBookFromDB,
    returnBookFromDB,
    overDueBooks
};

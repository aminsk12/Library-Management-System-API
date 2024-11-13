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
exports.BorrowedBookService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const uuid_1 = require("uuid");
const error_1 = require("../../utils/error");
const http_status_codes_1 = require("http-status-codes");
const borrowBookFromDB = (bookId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, uuid_1.validate)(bookId)) {
        throw new error_1.BadRequestError(`Invalid book ID format. Please provide a valid UUID.`);
    }
    if (!(0, uuid_1.validate)(memberId)) {
        throw new error_1.BadRequestError(`Invalid member ID format. Please provide a valid UUID.`);
    }
    return yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield prisma.book.findUnique({
            where: { bookId },
        });
        if (!book) {
            throw new error_1.NotFoundError(`Oops! The book with ID ${bookId} could not be found. Please check the ID and try again.`);
        }
        if (book.availableCopies <= 0) {
            throw new error_1.NotFoundError(`Sorry, the book "${book.title}" is currently out of stock and cannot be borrowed at the moment.`);
        }
        const member = yield prisma.member.findUnique({
            where: { memberId },
        });
        if (!member) {
            throw new error_1.NotFoundError(`Sorry, the member with ID ${memberId} could not be found. Please check the ID and try again.`);
        }
        const existingBorrow = yield prisma.borrowRecord.findFirst({
            where: { memberId, bookId, returnDate: null },
        });
        if (existingBorrow) {
            throw new error_1.BadRequestError(`You have already borrowed this book and have not returned it yet.`);
        }
        yield prisma.book.update({
            where: { bookId },
            data: { availableCopies: { decrement: 1 } },
        });
        const borrowRecord = yield prisma.borrowRecord.create({
            data: {
                bookId,
                memberId,
                borrowDate: new Date(),
            },
            select: {
                borrowId: true,
                bookId: true,
                memberId: true,
                borrowDate: true,
            },
        });
        return borrowRecord;
    }));
});
const returnBookFromDB = (borrowId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, uuid_1.validate)(borrowId)) {
        throw new error_1.BadRequestError("Invalid borrow ID format. Please provide a valid UUID.");
    }
    return yield prisma_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const borrowRecord = yield prisma.borrowRecord.findUnique({
            where: { borrowId },
            include: { book: true },
        });
        if (!borrowRecord) {
            throw new error_1.NotFoundError(`No borrow record found for ID '${borrowId}'. Please check the borrow ID and try again.`);
        }
        if (borrowRecord.returnDate) {
            throw new error_1.BadRequestError(`This book has already been returned on ${borrowRecord.returnDate}. No further action is required.`);
        }
        const book = yield prisma.book.findUnique({
            where: { bookId: borrowRecord.bookId },
        });
        yield prisma.borrowRecord.update({
            where: { borrowId },
            data: { returnDate: new Date() },
        });
        const result = yield prisma.book.update({
            where: { bookId: borrowRecord.bookId },
            data: { availableCopies: { increment: 1 } },
        });
        return result;
    }));
});
const overdueBooksCheck = () => __awaiter(void 0, void 0, void 0, function* () {
    const overDueLimitDays = 14;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - overDueLimitDays);
    const overdueBooks = yield prisma_1.default.borrowRecord.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lt: cutoffDate,
            },
        },
        select: {
            borrowId: true,
            borrowDate: true,
            book: {
                select: {
                    title: true,
                },
            },
            member: {
                select: {
                    name: true,
                },
            },
        },
    });
    if (overdueBooks.length === 0) {
        return {
            success: true,
            status: 200,
            message: "No overdue books",
            data: [],
        };
    }
    const overdueList = overdueBooks.map((record) => {
        const overdueDays = Math.max(0, Math.floor((new Date().getTime() - new Date(record.borrowDate).getTime()) / (1000 * 60 * 60 * 24)) - overDueLimitDays);
        return {
            borrowId: record.borrowId,
            bookTitle: record.book.title,
            borrowerName: record.member.name,
            overdueDays,
        };
    });
    return {
        success: true,
        status: http_status_codes_1.StatusCodes.OK,
        message: "Overdue borrow list fetched",
        data: overdueList,
    };
});
exports.BorrowedBookService = {
    borrowBookFromDB,
    returnBookFromDB,
    overdueBooksCheck
};

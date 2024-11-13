"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.BadRequestError = exports.AppError = void 0;
const http_status_codes_1 = require("http-status-codes");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.CONFLICT);
    }
}
exports.ConflictError = ConflictError;

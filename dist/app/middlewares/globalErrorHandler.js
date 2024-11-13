"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const error_1 = require("../utils/error");
;
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof error_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.statusCode,
            message: err.message,
        });
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong!",
    });
};
exports.default = globalErrorHandler;

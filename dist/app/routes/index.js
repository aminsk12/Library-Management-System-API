"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_route_1 = require("../modules/member/member.route");
const borrowRecord_route_1 = require("../modules/borrowRecord/borrowRecord.route");
const book_route_1 = require("../modules/books/book.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/books",
        route: book_route_1.BookRoutes,
    },
    {
        path: "/members",
        route: member_route_1.MemberRoutes
    },
    {
        path: "/",
        route: borrowRecord_route_1.BorrowedBookRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

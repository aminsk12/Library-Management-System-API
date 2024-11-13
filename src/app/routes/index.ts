import express from "express";

// import { MemberRoutes } from "../modules/member/member.route";
// import { BorrowedBookRoutes } from "../modules/borrowRecord/borrowRecord.route";
import { BookRoutes } from "../modules/books/book.route";
const router = express.Router();

const moduleRoutes = [
    {
        path: "/books",
        route: BookRoutes,
    },
    // {
    //     path: "/members",
    //     route: MemberRoutes
    // },
    // {
    //     path: "/",
    //     route: BorrowedBookRoutes
    // }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
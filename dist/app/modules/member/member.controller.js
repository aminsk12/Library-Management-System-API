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
exports.MemberController = void 0;
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const catchAysnc_1 = __importDefault(require("../../shared/catchAysnc"));
const member_service_1 = require("./member.service");
const createMember = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.createMember(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Member created successfully",
        data: result,
    });
}));
const getAllMembersFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberService.getAllMembersFromDB();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Members retrieved successfully",
        data: result,
    });
}));
const getMemberByIdFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { memberId } = req.params;
    if (memberId.startsWith(":")) {
        memberId = memberId.substring(1);
    }
    const result = yield member_service_1.MemberService.getMemberByIdFromDB(memberId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Member retrieved successfully",
        data: result,
    });
}));
const updateMemberIntoDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { memberId } = req.params;
    if (memberId.startsWith(":")) {
        memberId = memberId.substring(1);
    }
    const payload = req.body;
    const result = yield member_service_1.MemberService.updateMemberIntoDB(memberId, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Member updated successfully",
        data: result,
    });
}));
const deleteMemberFromDB = (0, catchAysnc_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { memberId } = req.params;
    if (memberId.startsWith(":")) {
        memberId = memberId.substring(1);
    }
    yield member_service_1.MemberService.deleteMemberFromDB(memberId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Member successfully deleted",
    });
}));
exports.MemberController = {
    createMember,
    getAllMembersFromDB,
    getMemberByIdFromDB,
    updateMemberIntoDB,
    deleteMemberFromDB
};

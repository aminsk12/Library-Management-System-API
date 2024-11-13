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
exports.MemberService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const uuid_1 = require("uuid");
const error_1 = require("../../utils/error");
// Helper function to check if memberId is valid and if member exists
const getMemberById = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, uuid_1.validate)(memberId)) {
        throw new error_1.BadRequestError(`Invalid member ID format. Please provide a valid UUID.`);
    }
    const member = yield prisma_1.default.member.findUnique({
        where: { memberId },
    });
    if (!member) {
        throw new error_1.NotFoundError(`Sorry, the member with ID ${memberId} could not be found. Please check the ID and try again.`);
    }
    return member;
});
const createMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingMember = yield prisma_1.default.member.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingMember) {
        throw new error_1.ConflictError(`A member with the email ${payload.email} already exists.`);
    }
    const createdMember = yield prisma_1.default.member.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            membershipDate: payload.membershipDate,
        },
    });
    return createdMember;
});
const getAllMembersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield prisma_1.default.member.findMany();
    if (members.length === 0) {
        throw new error_1.NotFoundError("No members found in the database.");
    }
    return members;
});
const getMemberByIdFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    // const member = await prisma.member.findUnique({
    //     where: { memberId },
    // });
    // return member;
    return yield getMemberById(memberId);
});
const updateMemberIntoDB = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield getMemberById(memberId);
    const updatedMember = yield prisma_1.default.member.update({
        where: { memberId },
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        },
    });
    return updatedMember;
});
const deleteMemberFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    yield getMemberById(memberId);
    const deletedMember = yield prisma_1.default.member.delete({
        where: { memberId },
    });
    return deletedMember;
});
exports.MemberService = {
    createMember,
    getAllMembersFromDB,
    getMemberByIdFromDB,
    updateMemberIntoDB,
    deleteMemberFromDB
};

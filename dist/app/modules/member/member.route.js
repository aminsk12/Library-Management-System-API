"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const member_controller_1 = require("./member.controller");
const router = express_1.default.Router();
router.post("/", member_controller_1.MemberController.createMember);
router.get("/", member_controller_1.MemberController.getAllMembersFromDB);
router.get("/:memberId", member_controller_1.MemberController.getMemberByIdFromDB);
router.put("/:memberId", member_controller_1.MemberController.updateMemberIntoDB);
router.delete("/:memberId", member_controller_1.MemberController.deleteMemberFromDB);
exports.MemberRoutes = router;

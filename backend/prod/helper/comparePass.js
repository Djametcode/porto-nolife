"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePass = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const comparePass = (data) => {
    const isMatch = bcrypt_1.default.compare(data.plainPass, data.databasePass);
    return isMatch;
};
exports.comparePass = comparePass;

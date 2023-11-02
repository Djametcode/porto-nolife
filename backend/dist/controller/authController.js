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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registUser = void 0;
const userModel_1 = require("../model/userModel");
const hashPassword_1 = require("../helper/hashPassword");
const registUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email) {
        return res.status(400).json({ msg: 'Please fill all requipment' });
    }
    if (!password) {
        return res.status(400).json({ msg: "Please fill password" });
    }
    try {
        const hashedPass = yield (0, hashPassword_1.hashPassword)(password);
        console.log(hashedPass);
        const newUser = new userModel_1.userModel({
            username: username,
            email: email,
            password: hashedPass
        });
        const user = yield userModel_1.userModel.create(newUser);
        return res.status(200).json({ msg: "Success", user });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.registUser = registUser;

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
exports.updateAvatar = exports.loginUser = exports.registUser = void 0;
const userModel_1 = require("../model/userModel");
const hashPassword_1 = require("../helper/hashPassword");
const comparePass_1 = require("../helper/comparePass");
const generateJWT_1 = require("../helper/generateJWT");
const cloudinary_1 = require("cloudinary");
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
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ msg: "Please fill email" });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Email not registered yet" });
        }
        const isPassMatch = yield (0, comparePass_1.comparePass)({ plainPass: password, databasePass: user.password });
        console.log(isPassMatch);
        if (!isPassMatch) {
            return res.status(400).json({ msg: "Password wrong" });
        }
        const token = yield (0, generateJWT_1.generateJWT)({ email: email, id: user._id });
        return res.status(200).json({ msg: "Success", user, token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let file = req.file;
    let userId = req.user.userId;
    if (!file) {
        return res.status(400).json({ msg: "No file attaced" });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ msg: "Token not valid" });
        }
        let result = yield cloudinary_1.v2.uploader.upload(file.path, {
            folder: "Testing",
            resource_type: 'auto'
        });
        user.updateOne({ $set: { avatar: result.secure_url } });
        yield user.save();
        return res.status(200).json({ msg: "success", user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateAvatar = updateAvatar;

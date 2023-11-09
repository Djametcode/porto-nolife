var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from "../model/userModel";
import { hashPassword } from "../helper/hashPassword";
import { comparePass } from "../helper/comparePass";
import { generateJWT } from "../helper/generateJWT";
const registUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email) {
        return res.status(400).json({ msg: 'Please fill all requipment' });
    }
    if (!password) {
        return res.status(400).json({ msg: "Please fill password" });
    }
    try {
        const hashedPass = yield hashPassword(password);
        console.log(hashedPass);
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPass
        });
        const user = yield userModel.create(newUser);
        return res.status(200).json({ msg: "Success", user });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: "Internal server error" });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ msg: "Please fill email" });
    }
    try {
        const user = yield userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Email not registered yet" });
        }
        const isPassMatch = yield comparePass({ plainPass: password, databasePass: user.password });
        console.log(isPassMatch);
        if (!isPassMatch) {
            return res.status(400).json({ msg: "Password wrong" });
        }
        const token = yield generateJWT({ email: email, id: user._id });
        return res.status(200).json({ msg: "Success", user, token });
    }
    catch (error) {
        console.log(error);
    }
});
export { registUser, loginUser };

import jwt from "jsonwebtoken";
const generateJWT = (data) => {
    const token = jwt.sign({ userId: data.id, email: data.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMES });
    return token;
};
export { generateJWT };

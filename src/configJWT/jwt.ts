import jwt from "jsonwebtoken";

const secret = "89489fdfb30ed98117df52bb589a46ad";

export const sing = (payload: string) => jwt.sign(payload, secret);
export const verifyToken = (token: string) => jwt.verify(token, secret);
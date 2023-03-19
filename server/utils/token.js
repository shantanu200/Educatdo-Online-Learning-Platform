import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    return jwt.sign({id},process.env.tokenid,{
        expiresIn: "30d"
    });
}


import jwt from "jsonwebtoken"

    // generating token
export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    // sending the generated token to user in a http only cookie
    res.cookie("jwt", token,{
        maxAge: 7*24*60*60*100, // in millisecond // after 7 days it will expire, so user have to login again
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
}   ;
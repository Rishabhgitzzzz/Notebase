import type { Request, Response, NextFunction } from "express";
import { env } from "../env.js"
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

// If you're importing a value (function, object) → use import
// If you're importing a type → use import type



export const auth = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(400).json({
                msg: "U are not logged in token required "
            })
        }

        const decodeData = jwt.verify(token as string, env.JWT_SECRET);
        req.userId = (decodeData as JwtPayload).id;

        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        })
    }
};


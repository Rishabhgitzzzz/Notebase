import dotenv from "dotenv";
dotenv.config()
import express, { urlencoded } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserModel } from "./models/user.model.js";
import { db } from "./config/db.js";
import { env } from "./env.js"
import { auth } from "./middlewares/auth.js";
import { ContentModel } from "./models/content.model.js";
import mongoose, { Types } from "mongoose";



const app = express();

const PORT = env.PORT;

db();

app.use(express.json());
app.use(urlencoded({ extended: true }));


app.post("/api/v1/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        const zodUserSchema = z.object({
            username: z.string().min(3).max(10),
            password: z.string().min(8, { message: "Password must be at least 8 characters" })
                .max(20, { message: "Password must be at most 20 characters" })
                .refine(val => /[A-Z]/.test(val), { message: "Must contain at least one uppercase letter" })
                .refine(val => /[a-z]/.test(val), { message: "Must contain at least one lowercase letter" })
                .refine(val => /[0-9]/.test(val), { message: "Must contain at least one number" })
                .refine(val => /[^A-Za-z0-9]/.test(val), { message: "Must contain at least one special character" })
        });

        const isvalidation = zodUserSchema.safeParse(req.body);

        if (!isvalidation.success) {

            return res.status(400).json({
                msg: "Error in inputs"
            })

        }

        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(403).json({
                msg: "User already exists with this username"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            username,
            password: hashPassword
        })

        res.status(201).json({
            msg: "Signed Up"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        })
    }


});

app.post("/api/v1/signin", async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({
                msg: "No user found"
            })
        }
        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(403).json({
                msg: "Invalid credentials"
            })
        }

        const jwt_token = jwt.sign({ id: user._id }, env.JWT_SECRET);

        res.status(200).json({
            msg: "logged In",
            token: jwt_token

        })

    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        })
    }
});

app.post("/api/v1/content", auth, async (req, res) => {
    //validation
    try {
        const { link, title, type } = req.body;

        const content = await ContentModel.create({
            link,
            title,
            type,
            userID: new Types.ObjectId(req.userId)
        })

        res.status(200).json({
            msg: "content added",
            content
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        })
    }
});

app.get("/api/v1/content", auth, async (req, res) => {
    try {
        const content = await ContentModel.find({ userID: new Types.ObjectId(req.userId) }).populate("userID", "username");
        res.status(200).json({
            msg: "content added",
            content
        })
    } catch (error) {
        res.status(500).json({
            msg: "Server error"
        })
    }
});

app.delete("/api/v1/content", (req, res) => { });

app.post("/api/v1/brain/share", (req, res) => { });

app.get("/api/v1/brain/:shareLink", (req, res) => { });


app.listen(PORT, () => {
    console.log(`server listening to port ${PORT}`);
})






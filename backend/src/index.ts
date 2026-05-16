import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { UserModel } from "./models/user.model.js";
import { db } from "./utils/db.js";
import { env } from "./env.js";
import { auth } from "./middlewares/auth.js";
import { ContentModel } from "./models/content.model.js";
import mongoose, { Types } from "mongoose";
import { LinkModel } from "./models/link.models.js";
import { generateHash } from "./utils/generateHash.js";
import cors from "cors";

const app = express();

const PORT = env.PORT;

db();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const zodUserSchema = z.object({
      username: z.string().min(3).max(10),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(20, { message: "Password must be at most 20 characters" })
        .refine((val) => /[A-Z]/.test(val), {
          message: "Must contain at least one uppercase letter",
        })
        .refine((val) => /[a-z]/.test(val), {
          message: "Must contain at least one lowercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
          message: "Must contain at least one number",
        })
        .refine((val) => /[^A-Za-z0-9]/.test(val), {
          message: "Must contain at least one special character",
        }),
    });

    const isvalidation = zodUserSchema.safeParse(req.body);

    if (!isvalidation.success) {
      return res.status(400).json({
        msg: "Error in inputs",
      });
    }

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(403).json({
        msg: "User already exists with this username",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({
      msg: "Signed Up",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "No user found",
      });
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({
        msg: "Invalid credentials",
      });
    }

    const jwt_token = jwt.sign({ id: user._id }, env.JWT_SECRET);

    res.status(200).json({
      msg: "logged In",
      token: jwt_token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.post("/api/v1/content", auth, async (req, res) => {
  try {
    const zodContentSchema = z.object({
      link: z.string().url({ message: "Must be a valid URL" }),
      title: z.string().min(1, { message: "Title is required" }).max(50),
      type: z.enum(["youtube", "tweet", "docs", "link"], {
        message: "Type must be youtube, tweet, docs or link",
      }),
    });

    const validation = zodContentSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        msg: "Invalid inputs",
      });
    }

    const { link, title, type } = validation.data;

    const content = await ContentModel.create({
      link,
      title,
      type,
      userID: new Types.ObjectId(req.userId),
    });

    res.status(200).json({
      msg: "content added",
      content,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.get("/api/v1/content", auth, async (req, res) => {
  try {
    const content = await ContentModel.find({
      userID: new Types.ObjectId(req.userId),
    }).populate("userID", "username");
    res.status(200).json({
      msg: "content added",
      content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.delete("/api/v1/content", auth, async (req, res) => {
  try {
    const contentId = req.body.contentId;

    if (!req.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    await ContentModel.deleteOne({
      _id: contentId,
      userID: req.userId,
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.post("/api/v1/brain/share", auth, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const share = req.body.share;
    if (share) {
      const existingLink = await LinkModel.findOne({
        userId: req.userId,
      });

      if (existingLink) {
        res.json({
          msg: existingLink.hash,
        });
      }

      const hash = generateHash();
      const link = await LinkModel.create({
        hash,
        userID: req.userId,
      });
      res.json({
        msg: hash,
      });
    } else {
      await LinkModel.deleteOne({
        userId: req.userId,
      });

      res.json({
        msg: "Link removed",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
      hash,
    }).populate("userID", "username");

    if (!link) {
      return res.status(411).json({
        msg: "Incorrect input ",
      });
    }

    const user = await UserModel.findOne({ _id: link.userID });

    if (!user) {
      return res.status(411).json({
        msg: "No user found ",
      });
    }

    const content = await ContentModel.find({ userID: link.userID });

    res.status(200).json({
      link,
      content,
    });
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({
      msg: "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`server listening to port ${PORT}`);
});

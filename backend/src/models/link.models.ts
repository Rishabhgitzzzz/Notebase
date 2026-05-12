import { Schema, model } from "mongoose";


const linkSchema = new Schema({
    hash: {
        type: String,
        unique: true,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
})

export const LinkModel = model('link', linkSchema);
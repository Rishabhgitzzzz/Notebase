import { Schema, model } from "mongoose";

const contentSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
    enum: ["docs", "tweet", "youtube", "link"],
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  userID: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const ContentModel = model("content", contentSchema);

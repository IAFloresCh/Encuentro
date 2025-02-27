import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    date: Date,
    title: String,
    description: String,
    extraFields: [
      {
        text: String,
        textarea: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;

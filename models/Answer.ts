import { Schema, models, model } from "mongoose";
import Question from "./Question";
import User from "./User";

const AnswerSchema = new Schema(
  {
    question: {
      type: Schema.Types.ObjectId,
      ref: Question,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    text: String,
  },
  { timestamps: true }
);

export default models.Answer || model("Answer", AnswerSchema);

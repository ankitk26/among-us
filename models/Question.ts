import { Schema, models, model } from "mongoose";
import User from "./User";

const QuestionSchema = new Schema(
  {
    title: String,
    slug: String,
    body: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    tags: [String],
  },
  { timestamps: true }
);

// Not working
// QuestionSchema.index(
//   { title: "text", body: "text", tags: "text" },
//   { unique: true }
// );
export default models.Question || model("Question", QuestionSchema);

import { Schema, models, model } from "mongoose";
import User from "./User";

const VoteSchema = new Schema({
  entityId: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  value: {
    type: Number,
    default: 0,
  },
});

export default models.Vote || model("Vote", VoteSchema);

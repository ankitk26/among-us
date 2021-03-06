import { TOKEN_SECRET } from "@/constants/constants";
import { setLoginSession } from "@/lib/auth";
import { removeTokenCookie } from "@/lib/auth-cookies";
import Answer from "@/models/Answer";
import Question from "@/models/Question";
import User from "@/models/User";
import Vote from "@/models/Vote";
import {
  AnswersQuery,
  ChangePasswordMutationVariables,
  ForgotPasswordMutationVariables,
  LoginMutationVariables,
  MutationUpdateQuestionArgs,
  RegisterMutationVariables,
  SearchQuestionQueryVariables,
  UpdateAnswerMutationVariables,
  VoteEntityMutationVariables,
} from "@/src/generated/graphql";
import { sendMail } from "@/utils/sendEmail";
import { AuthenticationError } from "apollo-server-errors";
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import slugify from "slugify";
import { Context } from "./context";

export const resolvers = {
  Query: {
    // Get all the questions
    questions: async (_parent, __args) => {
      try {
        const questions = await Question.find()
          .populate("user", ["id", "username", "avatar"])
          .sort({
            createdAt: -1,
          });
        return questions;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    // Get info about a particular question
    question: async (_parent, { id }) => {
      try {
        const question = await Question.findById(id).populate("user", [
          "id",
          "username",
          "avatar",
        ]);
        return question;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    // Get's logged in user's data
    me: async (_parent: any, _args: any, ctx: Context) => {
      try {
        return ctx.user;
      } catch (err) {
        throw new AuthenticationError("Invalid token, log in again");
      }
    },

    // Gets all the answers for a particular question
    answers: async (_parent: any, { questionId }) => {
      try {
        const answers = await Answer.find({ question: questionId }).populate(
          "user",
          ["id", "username", "avatar"]
        );
        return answers;
      } catch (err) {
        console.log(err);
      }
    },

    // Get profile for any user
    profile: async (_parent: any, { username }) => {
      try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
          return null;
        }
        return user;
      } catch (err) {
        console.log(err.message);
      }
    },

    // Get all the questions containing given tag
    taggedQuestions: async (_parent, { tag }) => {
      try {
        const questions = await Question.find({ tags: tag }).populate("user", [
          "id",
          "username",
          "avatar",
        ]);
        return questions;
      } catch (err) {
        console.log(err.message);
      }
    },

    // Searches for questions containing given query
    search: async (_parent, { query }: SearchQuestionQueryVariables) => {
      try {
        const relatedQuestions = await Question.find({
          $text: {
            $search: query,
          },
        }).populate("user", ["id", "username", "avatar"]);
        return relatedQuestions;
      } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
      }
    },

    // Gets all the tags from all the questions
    allTags: async (_parent, __args) => {
      const tagsObj = await Question.find().select("tags");
      return tagsObj;
    },
  },

  Question: {
    // Used for routing purposes
    urlSlug: (parent) => `${parent.slug}-${parent.id}`,

    // Get total votes for the given question
    votes: async (parent, _args) => {
      try {
        const totalVotes = await Vote.find({ entityId: parent.id });
        if (!totalVotes) return 0;

        const votesValues = totalVotes.map((vote) => vote.value);
        const votesCount = votesValues.reduce((a, b) => a + b, 0);
        return votesCount;
      } catch (err) {
        console.log(err);
      }
    },

    // Check if user has upvoted, downvoted or never voted the question
    voteStatus: async (parent, _args, { user }: Context) => {
      try {
        if (!user) return 0;
        const vote = await Vote.findOne({ entityId: parent.id, user: user.id });
        if (!vote) return 0;
        return vote.value;
      } catch (err) {
        console.log(err);
      }
    },

    // Get answers count for the question
    answersCount: async (parent) => {
      const count = await Answer.count({ question: parent.id });
      return count;
    },
  },

  Answer: {
    // Get total votes for the given answer
    votes: async (parent, _args) => {
      try {
        console.log(parent);
        const totalVotes = await Vote.find({ entityId: parent.id });
        if (!totalVotes) return 0;

        const votesValues = totalVotes.map((vote) => vote.value);
        const votesCount = votesValues.reduce((a, b) => a + b, 0);
        return votesCount;
      } catch (err) {
        console.log(err);
      }
    },

    // Check if user has upvoted, downvoted or never voted the answer
    voteStatus: async (parent, _args, { user }: Context) => {
      try {
        if (!user) {
          return 0;
        }
        const vote = await Vote.findOne({ entityId: parent.id, user: user.id });
        if (!vote) return 0;
        return vote.value;
      } catch (err) {
        console.log(err);
      }
    },
  },

  Profile: {
    // Get all the questions asked by a particular user
    questions: async (parent) => {
      const questionsByUser = await Question.find({ user: parent.id }).populate(
        "user",
        ["id", "username"]
      );
      return questionsByUser;
    },

    // Get all the answers asked by a particular user
    answers: async (parent) => {
      const answersByUser = await Answer.find({ user: parent.id }).populate(
        "question",
        ["id", "title", "slug", "tags", "createdAt"]
      );
      return answersByUser;
    },
  },

  Mutation: {
    postQuestion: async (
      _parent: any,
      { questionInput }: any,
      ctx: Context
    ) => {
      try {
        const question = await Question.create({
          ...questionInput,
          slug: slugify(questionInput.title, {
            lower: true,
          }),
          user: ctx.user.id,
        });
        return question;
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    deleteQuestion: async (_parent, { questionId }, ctx: Context) => {
      try {
        const question = await Question.findById(questionId);
        if (!question.user.equals(ctx.user.id)) {
          throw new AuthenticationError("Not authorized");
        }
        const answers: AnswersQuery["answers"] = await Answer.find({
          question: questionId,
        }).select("id");
        const answerIds = answers.map((answer) => answer.id);
        await Answer.deleteMany({ id: answerIds });
        await Question.findByIdAndDelete(questionId);
        return "deleted question along with answers";
      } catch (err) {
        console.log(err.message);
        throw new AuthenticationError("Not authenticated");
      }
    },

    updateQuestion: async (
      _parent,
      { questionId, questionInput }: MutationUpdateQuestionArgs,
      ctx: Context
    ) => {
      try {
        const question = await Question.findById(questionId);
        if (!question.user.equals(ctx.user.id) || !ctx.user) {
          throw new AuthenticationError("Not authorized");
        }
        const { title, body, tags } = questionInput;
        question.title = title;
        question.body = body;
        question.tags = tags;
        question.slug = slugify(title, {
          lower: true,
        });

        const updatedQuestion = await question.save();
        return updatedQuestion;
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    postAnswer: async (_parent: any, { questionId, text }, ctx: Context) => {
      try {
        try {
          if (ctx.user) {
            const answer = await Answer.create({
              text,
              user: ctx.user.id,
              question: questionId,
            });
            return answer;
          }
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    updateAnswer: async (
      _parent,
      { answerId, text }: UpdateAnswerMutationVariables,
      ctx: Context
    ) => {
      try {
        const answer = await Answer.findById(answerId);
        // Check if answer posted belongs to logged-in user
        if (!ctx.user || !answer.user.equals(ctx.user.id)) {
          throw new AuthenticationError("Not authorized");
        }

        answer.text = text;
        const updatedAnswer = await answer.save();
        return updatedAnswer;
      } catch (err) {
        console.log(err);
      }
    },

    deleteAnswer: async (_parent, { answerId }, ctx: Context) => {
      try {
        const answer = await Answer.findById(answerId);
        if (!answer.user.equals(ctx.user.id)) {
          throw new AuthenticationError("Not authorized");
        }
        await Answer.findByIdAndDelete(answerId);
        return "deleted answer";
      } catch (err) {
        throw new AuthenticationError("Not authenticated");
      }
    },

    register: async (
      _parent: any,
      { userInput }: RegisterMutationVariables,
      ctx: Context
    ) => {
      try {
        const { email, username, password } = userInput;

        // Check for account with existing email
        const checkEmail = await User.exists({ email });
        if (checkEmail) {
          throw new Error("Email already exists");
        }

        // Check for account with existing username
        const checkUsername = await User.exists({ username });
        if (checkUsername) {
          throw new Error("Username already exists");
        }

        // Encrypyt the password
        const hashedPassword = await hash(password, 12);
        const user = await User.create({
          email,
          username,
          password: hashedPassword,
        });

        const payload = {
          id: user.id,
          email: user.email,
          username: user.username,
        };

        // Sets cookie with above payload
        await setLoginSession(ctx.res, payload);
        return payload;
      } catch (err) {
        throw new Error(err);
      }
    },

    login: async (
      _parent: any,
      { identifier, password }: LoginMutationVariables,
      ctx: Context
    ) => {
      // * Check if user exists
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
      if (!user) throw new AuthenticationError("Account not found");

      // Compare passwords
      const isMatched = await compare(password, user.password);
      if (!isMatched) throw new AuthenticationError("Incorrect password");

      // Create payload for token and set cookie
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      await setLoginSession(ctx.res, payload);
      const loggedInUser = { ...payload, avatar: user.avatar, bio: user.bio };
      return loggedInUser;
    },

    logout: (_parent: any, _args: any, ctx: Context) => {
      removeTokenCookie(ctx.res);
      return "Logged out";
    },

    updateProfile: async (_parent, { avatar, bio }, ctx: Context) => {
      try {
        if (!ctx.user) {
          throw new AuthenticationError("Not authenticated");
        }
        const user = await User.findById(ctx.user.id).select("-password");
        user.avatar = avatar;
        user.bio = bio;
        const updatedProfile = await user.save();
        return updatedProfile;
      } catch (err) {
        console.log(err);
      }
    },

    voteEntity: async (
      _parent,
      { entityId, value }: VoteEntityMutationVariables,
      { user }: Context
    ) => {
      const entity = await Vote.findOne({ entityId, user: user.id });

      // Check if the user has already voted before
      if (entity) {
        entity.value += value;
        await entity.save();
      } else {
        await Vote.create({
          value: 1,
          entityId,
          user: user.id,
        });
      }
      return "Voted";
    },

    forgotPassword: async (
      _parent,
      { email }: ForgotPasswordMutationVariables
    ) => {
      const user = await User.findOne({ email });
      if (!user) {
        return null;
      }

      // Create token with user's id
      const obj = { id: user.id };
      const token = sign(obj, TOKEN_SECRET, {
        expiresIn: "1h",
      });

      // Send email to user with given token containing user's identity
      await sendMail(email, token);
      return token;
    },

    changePassword: async (
      _parent,
      { password, token }: ChangePasswordMutationVariables
    ) => {
      try {
        const decoded = verify(token, TOKEN_SECRET) as any;
        if (!decoded) {
          throw new Error("Session expired");
        }
        // Get the user from the id included in the token
        const user = await User.findById(decoded.id);

        // Encrypt the password
        const hashedPassword = await hash(password, 12);

        // Update the password
        user.password = hashedPassword;
        await user.save();

        return "update done";
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

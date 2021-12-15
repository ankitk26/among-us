import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    questions: [Question]
    question(id: ID!): Question
    me: User
    answers(questionId: ID!): [Answer]
    profile(username: String!): Profile
    taggedQuestions(tag: String!): [Question]
    search(query: String): [Question]
    allTags: [Tag]
  }

  type Tag {
    tags: [String]
  }

  type Question {
    id: ID!
    title: String!
    slug: String!
    urlSlug: String!
    createdAt: String
    updatedAt: String
    body: String
    tags: [String]
    user: User
    votes: Int # Total votes of that question
    voteStatus: Int # To check whether vote status of the user
    answersCount: Int # Total answers submitted for the question
  }

  type User {
    id: ID!
    email: String!
    username: String!
    bio: String
    avatar: String
  }

  type Profile {
    id: ID!
    email: String
    username: String!
    bio: String
    avatar: String
    questions: [Question]
    answers: [Answer]
  }

  type Answer {
    id: ID!
    text: String!
    question: Question
    user: User
    createdAt: String
    updatedAt: String
    votes: Int # Total votes of the answer
    voteStatus: Int # To check vote status of the user
  }

  input QuestionInput {
    title: String!
    body: String
    tags: [String]
  }

  input UserInput {
    email: String!
    username: String!
    password: String!
  }

  type Mutation {
    postQuestion(questionInput: QuestionInput): Question
    deleteQuestion(questionId: ID!): String
    updateQuestion(questionId: ID!, questionInput: QuestionInput): Question
    login(identifier: String!, password: String!): User
    register(userInput: UserInput): User
    logout: String
    updateProfile(avatar: String, bio: String): User
    postAnswer(questionId: ID!, text: String!): Answer
    deleteAnswer(answerId: ID!): String
    updateAnswer(answerId: ID!, text: String): Answer
    voteEntity(entityId: ID!, value: Int!): String
    forgotPassword(email: String!): String
    changePassword(password: String!, token: String!): String
  }
`;

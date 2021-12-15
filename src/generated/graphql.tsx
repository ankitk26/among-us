import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Answer = {
  __typename?: 'Answer';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  question?: Maybe<Question>;
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  voteStatus?: Maybe<Scalars['Int']>;
  votes?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<Scalars['String']>;
  deleteAnswer?: Maybe<Scalars['String']>;
  deleteQuestion?: Maybe<Scalars['String']>;
  forgotPassword?: Maybe<Scalars['String']>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['String']>;
  postAnswer?: Maybe<Answer>;
  postQuestion?: Maybe<Question>;
  register?: Maybe<User>;
  updateAnswer?: Maybe<Answer>;
  updateProfile?: Maybe<User>;
  updateQuestion?: Maybe<Question>;
  voteEntity?: Maybe<Scalars['String']>;
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteAnswerArgs = {
  answerId: Scalars['ID'];
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  identifier: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPostAnswerArgs = {
  questionId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationPostQuestionArgs = {
  questionInput?: InputMaybe<QuestionInput>;
};


export type MutationRegisterArgs = {
  userInput?: InputMaybe<UserInput>;
};


export type MutationUpdateAnswerArgs = {
  answerId: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProfileArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateQuestionArgs = {
  questionId: Scalars['ID'];
  questionInput?: InputMaybe<QuestionInput>;
};


export type MutationVoteEntityArgs = {
  entityId: Scalars['ID'];
  value: Scalars['Int'];
};

export type Profile = {
  __typename?: 'Profile';
  answers?: Maybe<Array<Maybe<Answer>>>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  questions?: Maybe<Array<Maybe<Question>>>;
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allTags?: Maybe<Array<Maybe<Tag>>>;
  answers?: Maybe<Array<Maybe<Answer>>>;
  me?: Maybe<User>;
  profile?: Maybe<Profile>;
  question?: Maybe<Question>;
  questions?: Maybe<Array<Maybe<Question>>>;
  search?: Maybe<Array<Maybe<Question>>>;
  taggedQuestions?: Maybe<Array<Maybe<Question>>>;
};


export type QueryAnswersArgs = {
  questionId: Scalars['ID'];
};


export type QueryProfileArgs = {
  username: Scalars['String'];
};


export type QueryQuestionArgs = {
  id: Scalars['ID'];
};


export type QuerySearchArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QueryTaggedQuestionsArgs = {
  tag: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  answersCount?: Maybe<Scalars['Int']>;
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  slug: Scalars['String'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  urlSlug: Scalars['String'];
  user?: Maybe<User>;
  voteStatus?: Maybe<Scalars['Int']>;
  votes?: Maybe<Scalars['Int']>;
};

export type QuestionInput = {
  body?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type DisplayQuestionFragment = { __typename?: 'Question', id: string, title: string, tags?: Array<string | null | undefined> | null | undefined, slug: string, createdAt?: string | null | undefined, urlSlug: string };

export type QuestionSnippetFragment = { __typename?: 'Question', id: string, title: string, slug: string, urlSlug: string, createdAt?: string | null | undefined, body?: string | null | undefined, tags?: Array<string | null | undefined> | null | undefined, votes?: number | null | undefined, voteStatus?: number | null | undefined, answersCount?: number | null | undefined, user?: { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined } | null | undefined };

export type UserFragmentFragment = { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: string | null | undefined };

export type DeleteAnswerMutationVariables = Exact<{
  answerId: Scalars['ID'];
}>;


export type DeleteAnswerMutation = { __typename?: 'Mutation', deleteAnswer?: string | null | undefined };

export type DeleteQuestionMutationVariables = Exact<{
  questionId: Scalars['ID'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion?: string | null | undefined };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword?: string | null | undefined };

export type LoginMutationVariables = Exact<{
  identifier: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', bio?: string | null | undefined, email: string, id: string, username: string, avatar?: string | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: string | null | undefined };

export type PostAnswerMutationVariables = Exact<{
  questionId: Scalars['ID'];
  text: Scalars['String'];
}>;


export type PostAnswerMutation = { __typename?: 'Mutation', postAnswer?: { __typename?: 'Answer', id: string } | null | undefined };

export type PostQuestionMutationVariables = Exact<{
  questionInput?: InputMaybe<QuestionInput>;
}>;


export type PostQuestionMutation = { __typename?: 'Mutation', postQuestion?: { __typename?: 'Question', id: string, title: string, createdAt?: string | null | undefined, updatedAt?: string | null | undefined, body?: string | null | undefined, tags?: Array<string | null | undefined> | null | undefined, slug: string, answersCount?: number | null | undefined, votes?: number | null | undefined, user?: { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined } | null | undefined } | null | undefined };

export type RegisterMutationVariables = Exact<{
  userInput?: InputMaybe<UserInput>;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', email: string, bio?: string | null | undefined, id: string, username: string, avatar?: string | null | undefined } | null | undefined };

export type UpdateAnswerMutationVariables = Exact<{
  answerId: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
}>;


export type UpdateAnswerMutation = { __typename?: 'Mutation', updateAnswer?: { __typename?: 'Answer', id: string, text: string, updatedAt?: string | null | undefined } | null | undefined };

export type UpdateProfileMutationVariables = Exact<{
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'User', bio?: string | null | undefined, email: string, id: string, username: string, avatar?: string | null | undefined } | null | undefined };

export type UpdateQuestionMutationVariables = Exact<{
  questionId: Scalars['ID'];
  questionInput?: InputMaybe<QuestionInput>;
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion?: { __typename?: 'Question', id: string, slug: string } | null | undefined };

export type VoteEntityMutationVariables = Exact<{
  entityId: Scalars['ID'];
  value: Scalars['Int'];
}>;


export type VoteEntityMutation = { __typename?: 'Mutation', voteEntity?: string | null | undefined };

export type AllQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllQuestionsQuery = { __typename?: 'Query', questions?: Array<{ __typename?: 'Question', id: string, title: string, slug: string, urlSlug: string, createdAt?: string | null | undefined, body?: string | null | undefined, tags?: Array<string | null | undefined> | null | undefined, votes?: number | null | undefined, voteStatus?: number | null | undefined, answersCount?: number | null | undefined, user?: { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type AnswersQueryVariables = Exact<{
  questionId: Scalars['ID'];
}>;


export type AnswersQuery = { __typename?: 'Query', answers?: Array<{ __typename?: 'Answer', id: string, text: string, createdAt?: string | null | undefined, updatedAt?: string | null | undefined, votes?: number | null | undefined, voteStatus?: number | null | undefined, user?: { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', bio?: string | null | undefined, email: string, id: string, username: string, avatar?: string | null | undefined } | null | undefined };

export type ProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: string, username: string, avatar?: string | null | undefined, email?: string | null | undefined, bio?: string | null | undefined, questions?: Array<{ __typename?: 'Question', id: string, title: string, tags?: Array<string | null | undefined> | null | undefined, slug: string, createdAt?: string | null | undefined, urlSlug: string, user?: { __typename?: 'User', id: string } | null | undefined } | null | undefined> | null | undefined, answers?: Array<{ __typename?: 'Answer', id: string, question?: { __typename?: 'Question', id: string, title: string, tags?: Array<string | null | undefined> | null | undefined, slug: string, createdAt?: string | null | undefined, urlSlug: string } | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type QuestionQueryVariables = Exact<{
  questionId: Scalars['ID'];
}>;


export type QuestionQuery = { __typename?: 'Query', question?: { __typename?: 'Question', voteStatus?: number | null | undefined, id: string, title: string, slug: string, urlSlug: string, createdAt?: string | null | undefined, body?: string | null | undefined, tags?: Array<string | null | undefined> | null | undefined, votes?: number | null | undefined, answersCount?: number | null | undefined, user?: { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined } | null | undefined } | null | undefined };

export type SearchQuestionQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type SearchQuestionQuery = { __typename?: 'Query', search?: Array<{ __typename?: 'Question', id: string, title: string, slug: string, urlSlug: string, createdAt?: string | null | undefined, body?: string | null | undefined, tags?: Array<string | null | undefined> | null | undefined, votes?: number | null | undefined, voteStatus?: number | null | undefined, answersCount?: number | null | undefined, user?: { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type TaggedQuestionsQueryVariables = Exact<{
  tag: Scalars['String'];
}>;


export type TaggedQuestionsQuery = { __typename?: 'Query', taggedQuestions?: Array<{ __typename?: 'Question', id: string, title: string, slug: string, urlSlug: string, createdAt?: string | null | undefined, body?: string | null | undefined, tags?: Array<string | null | undefined> | null | undefined, votes?: number | null | undefined, voteStatus?: number | null | undefined, answersCount?: number | null | undefined, user?: { __typename?: 'User', id: string, username: string, avatar?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type TopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopicsQuery = { __typename?: 'Query', allTags?: Array<{ __typename?: 'Tag', tags?: Array<string | null | undefined> | null | undefined } | null | undefined> | null | undefined };

export const DisplayQuestionFragmentDoc = gql`
    fragment DisplayQuestion on Question {
  id
  title
  tags
  slug
  createdAt
  urlSlug
}
    `;
export const QuestionSnippetFragmentDoc = gql`
    fragment QuestionSnippet on Question {
  id
  title
  slug
  urlSlug
  createdAt
  body
  tags
  user {
    id
    username
    avatar
  }
  votes
  voteStatus
  answersCount
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
  avatar
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!, $token: String!) {
  changePassword(password: $password, token: $token)
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const DeleteAnswerDocument = gql`
    mutation DeleteAnswer($answerId: ID!) {
  deleteAnswer(answerId: $answerId)
}
    `;

export function useDeleteAnswerMutation() {
  return Urql.useMutation<DeleteAnswerMutation, DeleteAnswerMutationVariables>(DeleteAnswerDocument);
};
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($questionId: ID!) {
  deleteQuestion(questionId: $questionId)
}
    `;

export function useDeleteQuestionMutation() {
  return Urql.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($identifier: String!, $password: String!) {
  login(identifier: $identifier, password: $password) {
    ...UserFragment
    bio
    email
  }
}
    ${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const PostAnswerDocument = gql`
    mutation PostAnswer($questionId: ID!, $text: String!) {
  postAnswer(questionId: $questionId, text: $text) {
    id
  }
}
    `;

export function usePostAnswerMutation() {
  return Urql.useMutation<PostAnswerMutation, PostAnswerMutationVariables>(PostAnswerDocument);
};
export const PostQuestionDocument = gql`
    mutation PostQuestion($questionInput: QuestionInput) {
  postQuestion(questionInput: $questionInput) {
    id
    title
    createdAt
    updatedAt
    body
    tags
    slug
    answersCount
    user {
      ...UserFragment
    }
    votes
  }
}
    ${UserFragmentFragmentDoc}`;

export function usePostQuestionMutation() {
  return Urql.useMutation<PostQuestionMutation, PostQuestionMutationVariables>(PostQuestionDocument);
};
export const RegisterDocument = gql`
    mutation Register($userInput: UserInput) {
  register(userInput: $userInput) {
    ...UserFragment
    email
    bio
  }
}
    ${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdateAnswerDocument = gql`
    mutation UpdateAnswer($answerId: ID!, $text: String) {
  updateAnswer(answerId: $answerId, text: $text) {
    id
    text
    updatedAt
  }
}
    `;

export function useUpdateAnswerMutation() {
  return Urql.useMutation<UpdateAnswerMutation, UpdateAnswerMutationVariables>(UpdateAnswerDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($avatar: String, $bio: String) {
  updateProfile(avatar: $avatar, bio: $bio) {
    ...UserFragment
    bio
    email
  }
}
    ${UserFragmentFragmentDoc}`;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};
export const UpdateQuestionDocument = gql`
    mutation UpdateQuestion($questionId: ID!, $questionInput: QuestionInput) {
  updateQuestion(questionId: $questionId, questionInput: $questionInput) {
    id
    slug
  }
}
    `;

export function useUpdateQuestionMutation() {
  return Urql.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument);
};
export const VoteEntityDocument = gql`
    mutation VoteEntity($entityId: ID!, $value: Int!) {
  voteEntity(entityId: $entityId, value: $value)
}
    `;

export function useVoteEntityMutation() {
  return Urql.useMutation<VoteEntityMutation, VoteEntityMutationVariables>(VoteEntityDocument);
};
export const AllQuestionsDocument = gql`
    query AllQuestions {
  questions {
    ...QuestionSnippet
  }
}
    ${QuestionSnippetFragmentDoc}`;

export function useAllQuestionsQuery(options: Omit<Urql.UseQueryArgs<AllQuestionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllQuestionsQuery>({ query: AllQuestionsDocument, ...options });
};
export const AnswersDocument = gql`
    query Answers($questionId: ID!) {
  answers(questionId: $questionId) {
    id
    text
    user {
      id
      username
      avatar
    }
    createdAt
    updatedAt
    votes
    voteStatus
  }
}
    `;

export function useAnswersQuery(options: Omit<Urql.UseQueryArgs<AnswersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AnswersQuery>({ query: AnswersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
    bio
    email
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProfileDocument = gql`
    query Profile($username: String!) {
  profile(username: $username) {
    id
    username
    avatar
    email
    bio
    questions {
      ...DisplayQuestion
      user {
        id
      }
    }
    answers {
      id
      question {
        ...DisplayQuestion
      }
    }
  }
}
    ${DisplayQuestionFragmentDoc}`;

export function useProfileQuery(options: Omit<Urql.UseQueryArgs<ProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfileQuery>({ query: ProfileDocument, ...options });
};
export const QuestionDocument = gql`
    query Question($questionId: ID!) {
  question(id: $questionId) {
    ...QuestionSnippet
    voteStatus
  }
}
    ${QuestionSnippetFragmentDoc}`;

export function useQuestionQuery(options: Omit<Urql.UseQueryArgs<QuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QuestionQuery>({ query: QuestionDocument, ...options });
};
export const SearchQuestionDocument = gql`
    query SearchQuestion($query: String) {
  search(query: $query) {
    ...QuestionSnippet
  }
}
    ${QuestionSnippetFragmentDoc}`;

export function useSearchQuestionQuery(options: Omit<Urql.UseQueryArgs<SearchQuestionQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchQuestionQuery>({ query: SearchQuestionDocument, ...options });
};
export const TaggedQuestionsDocument = gql`
    query TaggedQuestions($tag: String!) {
  taggedQuestions(tag: $tag) {
    ...QuestionSnippet
  }
}
    ${QuestionSnippetFragmentDoc}`;

export function useTaggedQuestionsQuery(options: Omit<Urql.UseQueryArgs<TaggedQuestionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TaggedQuestionsQuery>({ query: TaggedQuestionsDocument, ...options });
};
export const TopicsDocument = gql`
    query Topics {
  allTags {
    tags
  }
}
    `;

export function useTopicsQuery(options: Omit<Urql.UseQueryArgs<TopicsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TopicsQuery>({ query: TopicsDocument, ...options });
};
import { baseURL } from "@/constants/constants";
import {
  DeleteAnswerMutationVariables,
  UpdateAnswerMutationVariables,
} from "@/src/generated/graphql";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange } from "urql";

// Invalidate cache for given fields to update UI
const invalidateFields = (cache: Cache, fieldNames: string[]) => {
  const key = "Query";
  const allFields = cache.inspectFields(key);
  const fieldInfos = allFields.filter((fieldInfo) =>
    fieldNames.includes(fieldInfo.fieldName)
  );
  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate(key, fieldInfo.fieldKey);
  });
};

// Cache updation for different mutations
export const client = createClient({
  url: `${baseURL}/api/graphql`,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          deleteAnswer: (_result, args, cache) => {
            cache.invalidate({
              __typename: "Answer",
              id: (args as DeleteAnswerMutationVariables).answerId,
            });
          },

          postAnswer: (_result, _args, cache, _info) => {
            invalidateFields(cache, ["profile", "questions", "answers"]);
          },

          updateAnswer: (_result, args, cache, _info) => {
            cache.invalidate({
              __typename: "Answer",
              id: (args as UpdateAnswerMutationVariables).answerId,
            });
          },

          deleteQuestion: (_result, _args, cache) => {
            const allFields = cache.inspectFields("Query");
            invalidateFields(
              cache,
              allFields.map((field) => field.fieldName)
            );
          },

          login: (_result, _args, cache, _info) => {
            invalidateFields(cache, ["questions", "answers"]);
          },

          logout: (_result, _args, cache) => {
            const allFields = cache.inspectFields("Query");
            invalidateFields(
              cache,
              allFields.map((field) => field.fieldName)
            );
          },

          postQuestion: (_result, _args, cache, _info) => {
            invalidateFields(cache, ["questions", "profile"]);
          },

          updateQuestion: (_result, _args, cache, _info) => {
            invalidateFields(cache, ["question", "profile"]);
          },

          updateProfile: (_result, _args, cache, _info) => {
            invalidateFields(cache, ["profile"]);
          },

          voteEntity: (_result, _args, cache) => {
            const allFields = cache.inspectFields("Query");
            invalidateFields(
              cache,
              allFields.map((field) => field.fieldName)
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

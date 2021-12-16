import { AllQuestionsQuery } from "@/src/generated/graphql";
import QuestionCard from "./QuestionCard";

interface IProps {
  fetching: boolean;
  questions: AllQuestionsQuery["questions"];
  message: string;
}

export default function QuestionsList({
  fetching,
  questions,
  message,
}: IProps) {
  return (
    <>
      {fetching ? (
        // Show loading skeleton
        <div className="flex flex-col items-center w-full gap-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <Skeleton key={n} />
          ))}
        </div>
      ) : (
        // Map through all questions and display them
        <div className="flex flex-col items-center gap-8">
          {questions?.length > 0 ? (
            questions?.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <p className="self-start text-gray-500">{message}</p>
          )}
        </div>
      )}
    </>
  );
}

const Skeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton skeleton-title"></div>
      <div className="mt-3 skeleton skeleton-body" />
      <div className="skeleton skeleton-body" />
      <div className="skeleton skeleton-body" />
      <div className="skeleton skeleton-body" />

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center flex-grow gap-6">
          <div className="skeleton skeleton-circle"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
        <div className="skeleton skeleton-subtitle"></div>
      </div>
    </div>
  );
};

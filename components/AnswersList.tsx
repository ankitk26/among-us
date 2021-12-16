import { useAnswersQuery } from "@/src/generated/graphql";
import AnswerCard from "./AnswerCard";
import ErrorAlert from "./ErrorAlert";

interface IProps {
  questionId: string;
}

export default function AnswersList({ questionId }: IProps) {
  const [{ data, fetching, error }] = useAnswersQuery({
    variables: { questionId },
  });

  const answers = data?.answers;

  return (
    <div>
      {error && <ErrorAlert />}

      {fetching ? (
        // Loading skeleton
        <div className="flex flex-col gap-12">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div>
          {/* Check for answers length to display appropriate content */}
          {answers.length > 0 && (
            <p className="text-sm text-gray-700">
              {answers.length} {answers.length > 1 ? "answers" : "answer"}
            </p>
          )}

          {/* Map through all the answers and display them */}
          <div className="flex flex-col gap-8 mt-4">
            {answers.length > 0 ? (
              answers.map((answer) => (
                <AnswerCard key={answer.id} answer={answer} />
              ))
            ) : (
              <p className="text-sm text-gray-500">No answers yet...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const Skeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="flex items-center flex-grow gap-6">
        <div className="skeleton skeleton-circle"></div>
        <div className="skeleton skeleton-subtitle"></div>
      </div>

      <div className="mt-5">
        <div className="skeleton skeleton-body" />
        <div className="skeleton skeleton-body" />
      </div>
    </div>
  );
};

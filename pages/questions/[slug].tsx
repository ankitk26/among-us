import AnswersList from "@/components/AnswersList";
import ErrorAlert from "@/components/ErrorAlert";
import Layout from "@/components/Layout";
import MDParser from "@/components/MDParser";
import PostAnswer from "@/components/PostAnswer";
import QuestionTags from "@/components/QuestionTags";
import UserFooter from "@/components/UserFooter";
import VotingButtons from "@/components/VotingButtons";
import { useQuestionQuery } from "@/src/generated/graphql";
import { useRouter } from "next/router";

export default function QuestionDetails() {
  const router = useRouter();
  const slug = router.query.slug as string;
  const questionId = slug?.split("-").pop();

  const [{ data, fetching, error }] = useQuestionQuery({
    variables: { questionId },
  });

  const question = data?.question;

  return (
    <Layout title={fetching ? "Loading...." : question?.title}>
      {error && <ErrorAlert />}

      {fetching ? (
        <Skeleton />
      ) : (
        <div className="flex items-start w-full gap-8 mt-6">
          <VotingButtons entity={question} />

          <div className="w-full">
            <h2 className="text-xl font-medium text-gray-700">
              {question.title}
            </h2>

            <UserFooter question={question} className="mt-4 text-gray-600" />

            {question.body && (
              <MDParser className="mt-8">{question.body}</MDParser>
            )}

            <QuestionTags tags={question.tags} />

            <div className="h-px my-8 bg-gray-200" />

            <section>
              <AnswersList questionId={questionId} />
              <PostAnswer questionId={questionId} />
            </section>
          </div>
        </div>
      )}
    </Layout>
  );
}

const Skeleton = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton skeleton-title" />
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center flex-grow gap-6">
          <div className="skeleton skeleton-circle"></div>
          <div className="skeleton skeleton-subtitle"></div>
        </div>
      </div>

      <div className="mt-8">
        <div className="skeleton skeleton-body" />
        <div className="skeleton skeleton-body" />
        <div className="skeleton skeleton-body" />
        <div className="skeleton skeleton-body" />
      </div>
    </div>
  );
};

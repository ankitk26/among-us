import ErrorAlert from "@/components/ErrorAlert";
import Layout from "@/components/Layout";
import QuestionsList from "@/components/QuestionsList";
import { useTaggedQuestionsQuery } from "@/src/generated/graphql";
import { TagIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export default function TaggedQuestion() {
  const router = useRouter();
  const tag = router.query?.tag as string;

  const [{ data, fetching, error }] = useTaggedQuestionsQuery({
    variables: { tag },
  });
  const questions = data?.taggedQuestions;

  return (
    <Layout title={`Questions tagged on ${tag}`}>
      <div className="flex items-center gap-4 text-gray-800">
        <TagIcon className="w-5 h-5" />
        <h1 className="text-2xl font-semibold">{tag}</h1>
      </div>

      {error && (
        <div className="mt-4">
          <ErrorAlert />
        </div>
      )}

      <div className="flex flex-col items-stretch w-full gap-8 mt-4">
        <QuestionsList
          fetching={fetching}
          questions={questions}
          message={`No questions found related to ${tag}`}
        />
      </div>
    </Layout>
  );
}

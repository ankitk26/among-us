import ErrorAlert from "@/components/ErrorAlert";
import Layout from "@/components/Layout";
import QuestionsList from "@/components/QuestionsList";
import { useAllQuestionsQuery } from "@/src/generated/graphql";

export default function Home() {
  const [{ data, fetching, error }] = useAllQuestionsQuery();

  return (
    <Layout title="Among-us - Home">
      {error ? (
        <ErrorAlert />
      ) : (
        <QuestionsList
          fetching={fetching}
          questions={data?.questions}
          message="No question posted yet..."
        />
      )}
    </Layout>
  );
}

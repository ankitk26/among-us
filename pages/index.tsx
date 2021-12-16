import Layout from "@/components/Layout";
import QuestionsList from "@/components/QuestionsList";
import Stringify from "@/components/Stringify";
import { useAllQuestionsQuery } from "@/src/generated/graphql";

export default function Home() {
  const [{ data, fetching, error }] = useAllQuestionsQuery();

  console.log(process.env.NODE_ENV);

  return (
    <Layout title="Home">
      <Stringify obj={error} />
      <QuestionsList
        fetching={fetching}
        questions={data?.questions}
        message="No question posted yet..."
      />
    </Layout>
  );
}

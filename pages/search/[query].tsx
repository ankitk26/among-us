import Layout from "@/components/Layout";
import QuestionsList from "@/components/QuestionsList";
import { useSearchQuestionQuery } from "@/src/generated/graphql";
import { useRouter } from "next/router";

export default function SearchResults() {
  const router = useRouter();
  const query = router.query.query as string;

  const [{ data, fetching, error }] = useSearchQuestionQuery({
    variables: { query },
  });

  if (error) console.log(error);

  return (
    <Layout title={`Search results for ${query}`}>
      <h1 className="text-2xl font-semibold">
        {/* Using &quot; instead of "" because of eslint errors */}
        Search results for &quot;{query}&quot;
      </h1>
      <div className="flex flex-col items-stretch w-full gap-8 mt-4">
        <QuestionsList
          fetching={fetching}
          questions={data?.search}
          message={`No results found for "${query}"`}
        />
      </div>
    </Layout>
  );
}

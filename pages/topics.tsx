import Layout from "@/components/Layout";
import { useTopicsQuery } from "@/src/generated/graphql";
import { Badge } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Topics() {
  const [{ data, fetching, error }] = useTopicsQuery();
  if (error) console.log(error);

  const [tagsCount, setTagsCount] = useState([]);
  const allTags = data?.allTags;

  useEffect(() => {
    if (allTags) {
      const obj = {};
      allTags.forEach((tagArray) => {
        tagArray.tags.forEach((tag) => {
          obj[tag] = obj[tag] ? obj[tag] + 1 : 1;
        });
      });
      setTagsCount(Object.entries(obj));
    }
  }, [allTags]);

  return (
    <Layout title="Explore topics">
      <h1 className="text-2xl font-semibold">Topics</h1>

      {fetching ? (
        <Skeleton />
      ) : (
        <div className="flex flex-col gap-3 mt-4">
          {tagsCount.map(([tag, value]) => (
            <div key={tag} className="flex items-center gap-3">
              <Link href={`/tags/${tag}`}>
                <a>
                  <Badge>
                    {tag} ({value})
                  </Badge>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-8 skeleton-wrapper">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="skeleton skeleton-subtitle"></div>
      ))}
    </div>
  );
};

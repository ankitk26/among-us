import { Tag } from "@chakra-ui/tag";
import Link from "next/link";

interface IProps {
  tags: string[];
}

export default function QuestionTags({ tags }: IProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mt-8">
      {tags.map((tag) => (
        <Link key={tag} href={`/tags/${tag}`}>
          <a>
            <Tag size="sm">{tag}</Tag>
          </a>
        </Link>
      ))}
    </div>
  );
}

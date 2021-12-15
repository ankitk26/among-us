import { QuestionQuery } from "@/src/generated/graphql";
import { ChatAltIcon } from "@heroicons/react/solid";
import Link from "next/link";
import MDParser from "./MDParser";
import QuestionTags from "./QuestionTags";
import UserFooter from "./UserFooter";
import VotingButtons from "./VotingButtons";

interface IProps {
  question: QuestionQuery["question"];
}

export default function QuestionCard({ question }: IProps) {
  return (
    <div className="flex items-start w-full gap-8 p-6 bg-white border rounded">
      {/* Upvote/downvote buttons */}
      <VotingButtons entity={question} />

      <div className="w-full">
        {/* Question title */}
        <Link href={`/questions/${question.urlSlug}`}>
          <a>
            <h2 className="text-xl font-medium text-gray-700 line-clamp-2">
              {question.title}
            </h2>
          </a>
        </Link>

        {/* Body of the question */}
        {question.body && (
          <MDParser className="mt-4 prose-sm line-clamp-4">
            {question.body}
          </MDParser>
        )}

        {/* Question tags */}
        <QuestionTags tags={question.tags} />

        {/* Divider */}
        <div className="h-px my-5 bg-gray-100" />

        {/* User's details */}
        <div className="flex items-center justify-between mt-5 text-gray-600">
          {/* Avatar and username of the user */}
          <UserFooter question={question} />

          {/* Total answers for the question */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ChatAltIcon className="w-4 h-4" />
            <span>{question.answersCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useAuth } from "@/context/AuthContext";
import { QuestionQuery } from "@/src/generated/graphql";
import { getTime } from "@/utils/getTime";
import { PencilIcon } from "@heroicons/react/outline";
import Link from "next/link";
import DeleteQuestionBtn from "./DeleteQuestionBtn";
import EditedPostPopover from "./EditedPopover";
import QuestionTags from "./QuestionTags";

interface IProps {
  question: QuestionQuery["question"];
  noControls?: boolean;
}

export default function QuestionMiniCard({
  question,
  noControls = false,
}: IProps) {
  const { user } = useAuth();

  return (
    <div className="p-3 border rounded">
      <div className="flex items-center justify-between">
        {/* Link to the question */}
        <Link href={`/questions/${question.urlSlug}`}>
          <a>
            <h3 className="font-medium text-gray-700 line-clamp-2">
              {question.title}
            </h3>
          </a>
        </Link>

        {/* Delete question and update question buttons */}
        {!noControls && user?.id === question.user.id && (
          <div className="flex items-center gap-3">
            <Link href={`/edit-question/${question.id}`}>
              <a>
                <button type="button">
                  <PencilIcon className="w-4 h-4 text-primary" />
                </button>
              </a>
            </Link>
            <DeleteQuestionBtn questionId={question.id} />
          </div>
        )}
      </div>

      {/* Date question was posted */}
      <span className="text-xs text-gray-500">
        posted on {getTime(question.createdAt)}{" "}
        {question.createdAt !== question.updatedAt && (
          <EditedPostPopover timestamp={question.updatedAt} />
        )}
      </span>

      {/* Question tags */}
      <QuestionTags tags={question.tags} />
    </div>
  );
}

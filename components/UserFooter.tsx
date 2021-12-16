import { default_avatar } from "@/constants/constants";
import { QuestionQuery } from "@/src/generated/graphql";
import { getTime } from "@/utils/getTime";
import { Avatar } from "@chakra-ui/avatar";
import Link from "next/link";
import EditedPopover from "./EditedPopover";

interface IProps {
  question: QuestionQuery["question"];
  className?: string;
}

export default function UserFooter({ question, className = "" }: IProps) {
  return (
    <div className={`flex items-center text-sm ${className}`}>
      {/* Show user's avatar and username  */}
      <Avatar src={question.user.avatar || default_avatar} size="sm" />
      <h5 className="ml-4">
        <Link href={`/profile/${question.user.username}`}>
          <a>
            <span className="font-medium text-primary">
              {question.user.username}
            </span>
          </a>
        </Link>{" "}
        posted on {getTime(question.createdAt)}{" "}
        {question.createdAt !== question.updatedAt && (
          <EditedPopover timestamp={question.updatedAt} />
        )}
      </h5>
    </div>
  );
}

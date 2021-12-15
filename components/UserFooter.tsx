import { default_avatar } from "@/constants/constants";
import { QuestionQuery } from "@/src/generated/graphql";
import { getTime } from "@/utils/getTime";
import { Avatar } from "@chakra-ui/avatar";
import Link from "next/link";

interface IProps {
  question: QuestionQuery["question"];
  className?: string;
}

export default function UserFooter({ question, className = "" }: IProps) {
  return (
    <div className={`flex items-center text-sm ${className}`}>
      <Avatar src={question.user.avatar || default_avatar} size="sm" />
      <h5 className="ml-4">
        Posted by{" "}
        <Link href={`/profile/${question.user.username}`}>
          <a>
            <span className="font-medium text-primary">
              {question.user.username}
            </span>
          </a>
        </Link>
      </h5>

      {/* Date question was posted on */}
      <span className="ml-8">{getTime(question.createdAt)}</span>
    </div>
  );
}

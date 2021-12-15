import { default_avatar } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { AnswersQuery } from "@/src/generated/graphql";
import { getTime } from "@/utils/getTime";
import { Avatar } from "@chakra-ui/avatar";
import Link from "next/link";
import DeleteAnswerBtn from "./DeleteAnswerBtn";
import EditAnswerBtn from "./EditAnswerBtn";
import MDParser from "./MDParser";
import VotingButtons from "./VotingButtons";

interface IProps {
  answer: AnswersQuery["answers"][0];
}

export default function AnswerCard({ answer }: IProps) {
  const { user } = useAuth();

  return (
    <div className="flex items-start w-full gap-8 p-6 border rounded">
      {/* Avatar and voting buttons */}
      <div className="flex flex-col items-center gap-6">
        <Avatar src={answer.user.avatar || default_avatar} size="sm" />
        <VotingButtons entity={answer} />
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* User who posted the answer */}
            <Link href={`/profile/${answer.user.username}`}>
              <a>
                <h4 className="text-sm font-medium text-primary">
                  {answer.user.username}
                </h4>
              </a>
            </Link>
            <span className="text-xs text-gray-500">
              {getTime(answer.createdAt)}
            </span>
          </div>

          {/* Buttons to edit and delete the answer if authenticated */}
          {answer.user.id === user?.id && (
            <div className="flex items-center gap-3">
              <EditAnswerBtn answerId={answer.id} text={answer.text} />
              <DeleteAnswerBtn answerId={answer.id} />
            </div>
          )}
        </div>

        {/* Answer content */}
        <MDParser className="mt-4">{answer.text}</MDParser>
      </div>
    </div>
  );
}

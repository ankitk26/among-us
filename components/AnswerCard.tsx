import { default_avatar } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { AnswersQuery } from "@/src/generated/graphql";
import { getTime } from "@/utils/getTime";
import { Avatar } from "@chakra-ui/avatar";
import Link from "next/link";
import DeleteAnswerBtn from "./DeleteAnswerBtn";
import EditAnswerBtn from "./EditAnswerBtn";
import EditedPostPopover from "./EditedPopover";
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
          <h5 className="text-xs text-gray-700">
            {/* User who posted the answer */}
            <Link href={`/profile/${answer.user.username}`}>
              <a className="inline-block">
                <h4 className="text-sm font-medium text-primary">
                  {answer.user.username}
                </h4>
              </a>
            </Link>{" "}
            posted on {getTime(answer.createdAt)}{" "}
            {/* Show date if question was edited ever */}
            {answer.createdAt !== answer.updatedAt && (
              <EditedPostPopover timestamp={answer.updatedAt} />
            )}
          </h5>

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

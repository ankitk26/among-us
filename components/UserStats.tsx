import { ProfileQuery } from "@/src/generated/graphql";
import { Tooltip } from "@chakra-ui/react";
import {
  AcademicCapIcon,
  QuestionMarkCircleIcon,
  ReplyIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";

interface IProps {
  profile: ProfileQuery["profile"];
}

export default function UserStats({ profile }: IProps) {
  const [userPoints, setUserPoints] = useState(0);

  // Calculates points earned
  useEffect(() => {
    if (profile) {
      const points = profile.questions.length * 5 + profile.answers.length * 10;
      setUserPoints(points);
    }
  }, [profile]);

  return (
    <div className="mt-20">
      <h3 className="text-lg font-medium text-gray-800">Stats</h3>
      <section className="flex items-center p-3 mt-4 text-gray-700 border rounded shadow-sm justify-evenly">
        {/* Displays total questions posted by user */}
        <div className="flex flex-col items-center gap-2">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          <span>
            <span className="text-primary">{profile.questions.length}</span>{" "}
            Questions
          </span>
        </div>

        {/* Displays total answers posted by user */}
        <div className="flex flex-col items-center gap-2">
          <ReplyIcon className="w-5 h-5" />
          <span>
            <span className="text-primary">{profile.answers.length}</span>{" "}
            Answers
          </span>
        </div>

        {/* Shows total points earned by user  */}
        <div className="flex flex-col items-center gap-2">
          <AcademicCapIcon className="w-5 h-5" />
          <Tooltip
            label="5 points per question, 10 points per answer"
            aria-label="Points distribution info"
          >
            <div>
              <span className="text-primary">{userPoints}</span> Points*
            </div>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}

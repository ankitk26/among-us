import { ProfileQuery } from "@/src/generated/graphql";
import { useState } from "react";
import QuestionMiniCard from "./QuestionMiniCard";

interface IProps {
  profile: ProfileQuery["profile"];
}

export default function UserTabs({ profile }: IProps) {
  const [tabIndex, setTabIndex] = useState(1);

  return (
    <div className="mt-20">
      <h3 className="text-lg font-medium text-gray-800">Contribution</h3>
      <ul className="flex items-center gap-8 mt-4" role="tablist">
        <li>
          <button
            className={`block px-5 py-3 text-xs font-medium leading-normal uppercase ${
              tabIndex === 1 ? "border-b-2 border-primary text-primary" : ""
            }`}
            onClick={() => setTabIndex(1)}
          >
            Questions
          </button>
        </li>
        <li>
          <button
            className={`block px-5 py-3 text-xs font-medium leading-normal uppercase ${
              tabIndex === 2 ? "border-b-2 border-primary text-primary" : ""
            }`}
            onClick={() => setTabIndex(2)}
          >
            Answers
          </button>
        </li>
      </ul>

      <div className="flex flex-col gap-4 mt-8">
        {tabIndex === 1 &&
          (profile.questions.length > 0 ? (
            profile.questions.map((question) => (
              <QuestionMiniCard key={question.id} question={question} />
            ))
          ) : (
            <p className="text-gray-500">No questions asked yet...</p>
          ))}

        {tabIndex === 2 &&
          (profile.answers.length > 0 ? (
            profile.answers.map((answer) => (
              <QuestionMiniCard
                key={answer.id}
                question={answer.question}
                noControls
              />
            ))
          ) : (
            <p className="text-gray-500">No questions answered yet...</p>
          ))}
      </div>
    </div>
  );
}

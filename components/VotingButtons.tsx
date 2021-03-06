import { useAuth } from "@/context/AuthContext";
import { useVoteEntityMutation } from "@/src/generated/graphql";
import { Spinner, useToast } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

interface Entity {
  id: string;
  votes?: number | null | undefined;
  voteStatus?: number | null | undefined;
}

interface IProps {
  entity: Entity;
}

interface ToastProps {
  title: string;
  status?: "info" | "error";
}

export default function VotingButtons({ entity }: IProps) {
  // If flag==0: user has not voted, flag==1: user has upvoted, flag==-1: user has downvoted
  const [flag, setFlag] = useState(0);

  // Sum of all the values of votes
  const [total, setTotal] = useState(0);

  const [isVoting, setIsVoting] = useState(false);
  const [, vote] = useVoteEntityMutation();
  const { user } = useAuth();

  const toast = useToast();
  // Opens toast when called
  const showToast = ({ title, status = "info" }: ToastProps) => {
    toast({
      title,
      duration: 4500,
      isClosable: true,
      status,
    });
  };

  useEffect(() => {
    if (entity) {
      setTotal(entity.votes);
      setFlag(entity.voteStatus);
    }
  }, [entity?.votes]);

  // handles upvoting
  const incrementVote = async () => {
    if (!user) {
      return showToast({ title: "Log in to vote", status: "error" });
    }
    if (flag !== 1) {
      setFlag((prev) => prev + 1);
      setTotal((prev) => prev + 1);
      handleVote(1);
    }
  };

  // handles downvoting
  const decrementVote = () => {
    if (!user) {
      return showToast({ title: "Log in to vote", status: "error" });
    }
    if (flag !== -1) {
      setFlag((prev) => prev - 1);
      setTotal((prev) => prev - 1);
      handleVote(-1);
    }
  };

  // Based on flag, update the vote status of user
  const handleVote = async (voteValue: number) => {
    setIsVoting(true);
    const res = await vote({ entityId: entity.id, value: voteValue });
    if (res.error) {
      return console.error(res.error.graphQLErrors[0].message);
    }
    // console.log(res.data);
    setIsVoting(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Upvote button */}
      <button onClick={incrementVote}>
        <ArrowUpIcon
          className={`w-4 h-4 ${flag === 1 ? "text-primary" : "text-gray-600"}`}
        />
      </button>

      {/* Votes count display */}
      {isVoting ? (
        <Spinner size="sm" color="brand.500" />
      ) : (
        <span
          className={`text-sm font-medium ${
            total > 0
              ? "text-primary"
              : total < 0
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {total}
        </span>
      )}

      {/* Downvote button */}
      <button onClick={decrementVote}>
        <ArrowDownIcon
          className={`w-4 h-4 ${
            flag === -1 ? "text-red-600" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  );
}

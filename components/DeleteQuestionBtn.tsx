import { useDeleteQuestionMutation } from "@/src/generated/graphql";
import { Button } from "@chakra-ui/button";
import { TrashIcon } from "@heroicons/react/outline";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface IProps {
  questionId: string;
}

export default function DeleteQuestionBtn({ questionId }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [, deleteQuestion] = useDeleteQuestionMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteQuestion({ questionId });
      console.log(res.data.deleteQuestion);
      setIsDeleting(false);
      closeModal();
    } catch (err) {
      console.error(err.message);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        <TrashIcon className="w-4 h-4 text-red-600" />
      </button>
      <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
        <TrashIcon className="w-16 h-16 text-red-600" />
        <h2 className="mt-12 font-semibold text-gray-700">
          You are about to delete this question
        </h2>
        <h3 className="font-semibold text-gray-500">Are you sure?</h3>

        <div className="flex items-center gap-4 mt-12">
          <Button type="button" onClick={closeModal}>
            Cancel
          </Button>

          <Button
            colorScheme="red"
            isLoading={isDeleting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </ModalWrapper>
    </>
  );
}

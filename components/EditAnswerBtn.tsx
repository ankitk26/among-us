import { useUpdateAnswerMutation } from "@/src/generated/graphql";
import { Button } from "@chakra-ui/button";
import { PencilIcon } from "@heroicons/react/outline";
import { Form, Formik } from "formik";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import TextEditor from "./TextEditor";

interface IProps {
  answerId: string;
  text: string;
}

// Get the answer_id and text as props
export default function EditCommentBtn({ answerId, text }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, updateAnswer] = useUpdateAnswerMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type="button" onClick={openModal}>
        <PencilIcon className="w-4 h-4 text-primary" />
      </button>

      <ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen} size="large">
        <PencilIcon className="w-16 h-16 text-primary" />

        <h2 className="self-start mt-10 font-semibold text-gray-700">
          Edit answer
        </h2>

        <Formik
          initialValues={{ text }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const { text } = values;
            const res = await updateAnswer({ answerId, text });
            if (res.error) console.log(res.error.message);
            closeModal();
            setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, setFieldValue, handleSubmit }) => (
            <Form className="w-full mt-4">
              <TextEditor
                fieldValue={values.text}
                setFieldValue={setFieldValue}
                fieldName="text"
              />

              <div className="flex items-center gap-4 mt-12">
                <Button type="button" onClick={closeModal}>
                  Cancel
                </Button>

                <Button
                  colorScheme="brand"
                  isLoading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalWrapper>
    </>
  );
}

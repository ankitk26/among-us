import Link from "next/link";
import { default_avatar } from "@/constants/constants";
import { useAuth } from "@/context/AuthContext";
import { usePostAnswerMutation } from "@/src/generated/graphql";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import TextEditor from "./TextEditor";
import { useRouter } from "next/router";

interface IProps {
  questionId: string;
}

export default function PostAnswer({ questionId }: IProps) {
  const { user } = useAuth();
  const [, postAnswer] = usePostAnswerMutation();
  const router = useRouter();

  return (
    <section className="mt-12">
      <h3 className="font-medium text-gray-600">Post answer</h3>
      {user ? (
        <div className="flex items-start gap-4 mt-4">
          <Avatar src={user.avatar || default_avatar} size="sm" />
          <Formik
            initialValues={{ text: "" }}
            onSubmit={async (values, { setSubmitting, setFieldValue }) => {
              setSubmitting(true);
              const { text } = values;

              // Handling posting answer functionality
              if (text) {
                const res = await postAnswer({ text, questionId });
                setFieldValue("text", "");
                if (res.error) {
                  console.log(res.error);
                }
              }
            }}
          >
            {({ setFieldValue, values, isSubmitting, handleSubmit }) => (
              <Form className="flex flex-col w-full gap-4 flex-end">
                <TextEditor
                  fieldValue={values.text}
                  setFieldValue={setFieldValue}
                  fieldName="text"
                />
                <Button
                  isLoading={isSubmitting}
                  colorScheme="brand"
                  size="sm"
                  onClick={() => handleSubmit()}
                  alignSelf="end"
                >
                  Post
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          <Link href={`/login?redirect_to=${router.asPath}`}>
            <a className="text-primary">Log in</a>
          </Link>{" "}
          to post answers
        </p>
      )}
    </section>
  );
}

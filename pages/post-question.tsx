import FormControl from "@/components/FormControl";
import Layout from "@/components/Layout";
import TagsInput from "@/components/TagsInput";
import TextEditor from "@/components/TextEditor";
import { useAuth } from "@/context/AuthContext";
import {
  QuestionInput,
  usePostQuestionMutation,
} from "@/src/generated/graphql";
import { Button } from "@chakra-ui/button";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title Required"),
  tags: yup
    .array(yup.string())
    .test({
      message: "Only 8 tags allowed",
      test: (arr) => arr.length <= 8,
    })
    .test({
      message: "Tags required",
      test: (arr) => arr.length > 0,
    }),
});

export default function Register() {
  const router = useRouter();
  const { user, authLoading } = useAuth();

  useEffect(() => {
    if (!user && !authLoading) {
      router.push(`/login?redirect_to=${router.asPath}`);
    }
  }, [user, authLoading]);

  const [, postQuestion] = usePostQuestionMutation();

  return (
    <Layout title="Post question">
      <h1 className="text-3xl font-semibold text-gray-800">Post question</h1>

      <Formik
        initialValues={{ title: "", body: "", tags: [] }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: QuestionInput,
          { setSubmitting }: FormikHelpers<QuestionInput>
        ) => {
          try {
            const res = await postQuestion({ questionInput: { ...values } });
            if (res.data.postQuestion) {
              setSubmitting(false);
              router.push("/");
            }
          } catch (err) {
            const errMessage: string = err?.response.errors[0].message;
            console.log(errMessage);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          handleSubmit,
        }) => (
          <Form className="flex flex-col items-start mt-10">
            <FormControl
              id="title"
              name="title"
              touched={touched.title}
              error={errors.title}
            />

            <div className="w-full mt-8">
              <label>Body</label>
              <TextEditor setFieldValue={setFieldValue} fieldName="body" />
            </div>

            <div className="w-full mt-8">
              <TagsInput
                value={values.tags}
                setValue={setFieldValue}
                touched={touched.tags}
                error={errors.tags}
              />
            </div>

            <Button
              type="button"
              mt={8}
              colorScheme="brand"
              isLoading={isSubmitting}
              onClick={() => handleSubmit()}
            >
              Post question
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

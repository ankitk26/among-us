import FormControl from "@/components/FormControl";
import Layout from "@/components/Layout";
import TagsInput from "@/components/TagsInput";
import TextEditor from "@/components/TextEditor";
import { useAuth } from "@/context/AuthContext";
import {
  QuestionInput,
  useQuestionQuery,
  useUpdateQuestionMutation,
} from "@/src/generated/graphql";
import { Button } from "@chakra-ui/button";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title Required"),
  body: yup.string().required("Body required"),
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
  const questionId = router.query.questionId as string;

  const [{ data, error }] = useQuestionQuery({ variables: { questionId } });

  if (error) console.log(error);

  // useEffect(() => {
  //   if (!user && !authLoading) {
  //     router.push("/login");
  //   }
  // }, [user, authLoading]);

  const [, updateQuestion] = useUpdateQuestionMutation();
  const question = data?.question;

  const getData = () => {
    if (question) {
      const { title, body, tags } = question;
      return { title, body, tags };
    }
    return {
      title: "",
      body: "",
      tags: [],
    };
  };

  return (
    <Layout title="Update question">
      <h1 className="text-3xl font-semibold text-gray-800">Update question</h1>

      <Formik
        initialValues={getData()}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={async (
          values: QuestionInput,
          { setSubmitting }: FormikHelpers<QuestionInput>
        ) => {
          try {
            const res = await updateQuestion({
              questionId,
              questionInput: { ...values },
            });
            const question = res.data.updateQuestion;
            setSubmitting(false);
            router.push(`/questions/${question?.slug}-${question?.id}`);
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

            <div className="flex flex-col w-full gap-1 mt-8">
              <label className="capitalize">Body</label>
              <TextEditor
                fieldValue={values.body}
                setFieldValue={setFieldValue}
                fieldName="body"
              />
            </div>

            <div className="w-full mt-8">
              <TagsInput
                value={values.tags}
                setValue={setFieldValue}
                touched={touched.tags}
                error={errors.tags}
              />
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Button
                colorScheme="brand"
                isLoading={isSubmitting}
                onClick={() => handleSubmit()}
              >
                Update
              </Button>

              <Button
                onClick={() => router.push(`/questions/${question.urlSlug}`)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

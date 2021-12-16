import Layout from "@/components/Layout";
import { useForgotPasswordMutation } from "@/src/generated/graphql";
import { Button } from "@chakra-ui/button";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Invalid email address"),
});

export default function ForgotPassword() {
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Layout title="Forgot password">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Reset password
        </h1>

        <h4 className="mt-4 text-gray-600">
          Enter your email to send a reset password link
        </h4>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={schema}
          onSubmit={async (values) => {
            const res = await forgotPassword({ email: values.email });
            if (res.error) {
              return console.log(res.error.graphQLErrors[0].message);
            }
            // console.log(res.data.forgotPassword);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col w-full mt-8">
              <Field
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter registered email"
              />
              {errors.email && (
                <span className="mt-2 text-sm font-medium text-red-600">
                  {errors.email}
                </span>
              )}
              <Button
                type="submit"
                colorScheme="brand"
                isLoading={isSubmitting}
                className="mt-8"
              >
                Send reset link
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}

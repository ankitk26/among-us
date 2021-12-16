import FormControl from "@/components/FormControl";
import Layout from "@/components/Layout";
import { useChangePasswordMutation } from "@/src/generated/graphql";
import { Button } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password should be of atleast 6 characters")
    .required("Required"),
  confirmPassword: yup.string().required("Required"),
});

interface FormValues {
  password: string;
  confirmPassword: string;
}

const SessionExpiredMessage = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <span className="text-red-600">Session expired</span>
      <Link href="/forgot-password">
        <a className="text-primary">Try again</a>
      </Link>
    </div>
  );
};

export default function ChangePassword() {
  const [, changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const token = router.query?.token as string;
  const [error, setError] = useState(null);

  return (
    <Layout title="Change password">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Change password
        </h1>

        {error && <SessionExpiredMessage />}

        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={schema}
          onSubmit={async (
            values,
            { setFieldError, resetForm }: FormikHelpers<FormValues>
          ) => {
            // Check for both passwords to be equal
            if (values.confirmPassword !== values.password) {
              return setFieldError("confirmPassword", "Passwords don't match");
            }

            // Call the function to update password
            const res = await changePassword({
              password: values.password,
              token,
            });

            // If any error, show message
            if (res.error) {
              if (res.error.message.includes("jwt expired")) {
                resetForm();
                return setError("Session expired... try again..");
              }
            }

            // Successfully updated the password and redirected to login page
            // console.log(res.data.changePassword);
            router.push("/login");
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col w-full mt-8">
              <FormControl
                id="password"
                name="password"
                type="password"
                touched={touched.password}
                error={errors.password}
              />

              <div className="mt-8">
                <FormControl
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  touched={touched.confirmPassword}
                  error={errors.confirmPassword}
                />
              </div>

              <Button
                type="submit"
                colorScheme="brand"
                isLoading={isSubmitting}
                className="mt-8"
              >
                Update password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}

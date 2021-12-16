import FormControl from "@/components/FormControl";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import {
  LoginMutationVariables,
  useLoginMutation,
} from "@/src/generated/graphql";
import { Button } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  identifier: yup.string().required("Identifier Required"),
  password: yup.string().required("Password Required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const redirectUrl = router.query?.redirect_to as string;

  const [, login] = useLoginMutation();

  return (
    <Layout title="Log in">
      <div>
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Log in
        </h1>

        <Formik
          initialValues={{ identifier: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (
            values: LoginMutationVariables,
            {
              setSubmitting,
              setFieldError,
            }: FormikHelpers<LoginMutationVariables>
          ) => {
            const res = await login(values);

            if (res.error) {
              const errMessage = res.error.graphQLErrors[0].message;
              console.log(errMessage);
              setSubmitting(false);
              if (errMessage.includes("Account")) {
                return setFieldError("identifier", errMessage);
              }
              if (errMessage.includes("password")) {
                return setFieldError("password", errMessage);
              }
            }

            setSubmitting(false);

            setUser(res.data.login);
            // console.log(res.data.login);
            if (redirectUrl) {
              return router.push(redirectUrl);
            }
            router.push("/");
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col items-stretch p-6 mt-4">
              <FormControl
                id="identifier"
                name="identifier"
                touched={touched.identifier}
                error={errors.identifier}
                placeholder="Email/username"
              />

              <div className="mt-8">
                <FormControl
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  touched={touched.password}
                  error={errors.password}
                />
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="showPassword"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                  />
                  <label
                    htmlFor="showPassword"
                    className="text-xs font-medium text-gray-600 cursor-pointer select-none"
                  >
                    Show password
                  </label>
                </div>

                <div>
                  <Link href="/forgot-password">
                    <a className="text-xs text-primary">Forgot password?</a>
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                colorScheme="brand"
                isLoading={isSubmitting}
                mt={8}
              >
                Log in
              </Button>

              <p className="mt-4 text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link href="/register">
                  <a className="text-primary">Register</a>
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
}

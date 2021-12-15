import FormControl from "@/components/FormControl";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRegisterMutation, UserInput } from "@/src/generated/graphql";
import { Button } from "@chakra-ui/button";
import { Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email Required"),
  username: yup
    .string()
    .required("Username required")
    .min(3, "Username should be of atleast 3 characters"),
  password: yup
    .string()
    .required("Password Required")
    .min(6, "Password should be of atleast 6 characters"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const [, register] = useRegisterMutation();

  return (
    <Layout title="Log in">
      <h1 className="text-3xl font-semibold text-center text-gray-800">
        Register
      </h1>

      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (
          values: UserInput,
          { setSubmitting, setFieldError }: FormikHelpers<UserInput>
        ) => {
          const res = await register({ userInput: { ...values } });
          console.log(res);

          if (res.error) {
            const errMessage: string = res.error.graphQLErrors[0].message;
            setSubmitting(false);
            if (errMessage.includes("Email")) {
              return setFieldError("email", errMessage);
            }
            if (errMessage.includes("Username")) {
              return setFieldError("username", errMessage);
            }
          }

          setSubmitting(false);
          setUser(res.data.register);
          router.push("/login");
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col p-6 mt-4">
            <FormControl
              id="email"
              name="email"
              type="email"
              touched={touched.email}
              error={errors.email}
              placeholder="name@domain.com"
            />

            <div className="w-full mt-8">
              <FormControl
                id="username"
                name="username"
                touched={touched.username}
                error={errors.username}
                placeholder="atleast 3 characters"
              />
            </div>

            <div className="w-full mt-8">
              <FormControl
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                touched={touched.password}
                error={errors.password}
                placeholder="atleast 6 characters"
              />
            </div>

            <div className="flex items-center gap-1 mt-3">
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

            <Button
              type="submit"
              colorScheme="brand"
              isLoading={isSubmitting}
              mt={8}
            >
              Register
            </Button>

            <p className="mt-4 text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-primary">Log in</a>
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

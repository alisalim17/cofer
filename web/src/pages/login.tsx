import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import Button from "../ui/Form/Button";
import FormWrapper, { IFormFooterLink } from "../ui/Form/FormWrapper";
import MyForm from "../ui/Form/MyForm";
import InputField from "../ui/Form/TextField/InputField";
import Header from "../ui/Header";
import UnProtectedRoute from "../ui/utilities/UnProtectedRoute";
import { useScreenType } from "../utils/hooks/useScreenType";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
import Link from "./../ui/utilities/Link";

const footerLinks: IFormFooterLink[] = [
  {
    href: "/register",
    text: "Register",
  },
  {
    href: "/register",
    text: "Register",
  },
  {
    href: "/register",
    text: "Register",
  },
];

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const screenType = useScreenType();

  return (
    <UnProtectedRoute>
      <Head>
        <title>Sign in | Cofer</title>
      </Head>
      <FormWrapper footerLinks={footerLinks}>
        <Formik<FormValues>
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await login({
              variables: { input: values },
              update: (cache, { data: _data, context }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: _data.login.user,
                  },
                });
              },
            });
            if (res.data?.login.errors) {
              setErrors(toErrorMap(res.data.login.errors));
            } else if (res.data?.login.user) {
              router.push((router.query?.next || "/") as string);
            }
          }}
        >
          {({ isSubmitting }) => (
            <MyForm>
              <Header headerType="h1" fontWeight="semibold" size="3xl" centered>
                Login
              </Header>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username or Email"
              />
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Button
                fontWeight="normal"
                width={175}
                height={40}
                extraClassName="mt-4"
                loading={isSubmitting}
                centered
                variant="primary"
                type="submit"
              >
                Login
              </Button>
              <Link href="http://localhost:4000/auth/github">
                login with github
              </Link>
            </MyForm>
          )}
        </Formik>
      </FormWrapper>
    </UnProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Login);

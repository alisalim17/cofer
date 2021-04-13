import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import Button from "../ui/Button";
import Header from "../ui/Header";
import InputField from "../ui/InputField";
import Link from "../ui/Link";
import MyForm from "../ui/MyForm";
import UnProtectedRoute from "../ui/UnProtectedRoute";
import Wrapper from "../ui/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const Login = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <UnProtectedRoute>
      <Head>
        <title>Sign in | Cofer</title>
      </Head>
      <Wrapper extraClassName="flex flex-col justify-center" mobileFull>
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
              <Header centered size="4xl" fontWeight="bold">
                Cofer
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
                width={175}
                height={40}
                extraClassName="mt-4"
                loading={isSubmitting}
                centered
                type="submit"
              >
                Login
              </Button>
            </MyForm>
          )}
        </Formik>
        <div className="flex justify-center">
          <div className="text-primary-100 py-2 px-4 rounded-5 border-default border-primary-800 mt-4 text-sm">
            New to GitHub? <Link href="/register">Create an account.</Link>
          </div>
        </div>
      </Wrapper>
    </UnProtectedRoute>
  );
};

export default withApollo({ ssr: false })(Login);

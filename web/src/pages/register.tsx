import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
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
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  return (
    <UnProtectedRoute>
      <Head>
        <title>Sign up | Cofer</title>
      </Head>
      <Wrapper extraClassName="flex flex-col justify-center" mobileFull>
        <Formik<FormValues>
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await register({
              variables: { input: values },
              update: (cache, { data: _data, context }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: _data.register.user,
                  },
                });
              },
            });
            const errors = res.data?.register.errors;
            if (errors) {
              setErrors(toErrorMap(errors));
            } else if (res.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <MyForm>
              <Header
                centered
                color="text-primary-100"
                size="4xl"
                fontWeight="bold"
              >
                Cofer
              </Header>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
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
                Register
              </Button>
            </MyForm>
          )}
        </Formik>
        <div className="flex justify-center">
          <div className="py-2 px-4 rounded-5 border-default border-primary-800 mt-4 text-sm">
            Already have an account ? <Link href="/login">Sign in.</Link>
          </div>
        </div>
      </Wrapper>
    </UnProtectedRoute>
  );
};

export default withApollo({ ssr: false })(Register);

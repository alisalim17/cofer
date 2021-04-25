import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import Button from "../ui/Form/Button";
import FormWrapper, { IFormFooterLink } from "../ui/Form/FormWrapper";
import MyForm from "../ui/Form/MyForm";
import InputField from "../ui/Form/TextField/InputField";
import Header from "../ui/Header";
import UnProtectedRoute from "../ui/utilities/UnProtectedRoute";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

const footerLinks: IFormFooterLink[] = [
  {
    href: "/login",
    text: "Login",
  },
  {
    href: "/login",
    text: "Login",
  },
  {
    href: "/login",
    text: "Login",
  },
];

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
      <FormWrapper footerLinks={footerLinks}>
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
                headerType="h1"
                centered
                color="text-primary-100"
                size="4xl"
                fontWeight="bold"
              >
                Register
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
                fontWeight="normal"
                variant="primary"
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
      </FormWrapper>
    </UnProtectedRoute>
  );
};

export default withApollo({ ssr: false })(Register);

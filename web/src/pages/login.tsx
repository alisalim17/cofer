import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import Header from "../ui/Header";
import Wrapper from "../ui/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";
import InputField from "../ui/InputField";
import MyForm from "../ui/MyForm";
import Button from "../ui/Button";

interface Props {}

const Login = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  return (
    <Wrapper extraClassName="flex items-center" mobileFull>
      <Formik
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
            router.push("/");
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
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);

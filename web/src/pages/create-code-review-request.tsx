import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import Button from "../ui/Button";
import Header from "../ui/Header";
import InputField from "../ui/InputField";
import MyForm from "../ui/MyForm";
import ProtectedRoute from "../ui/ProtectedRoute";
import Wrapper from "../ui/Wrapper";
import { withApollo } from "../utils/withApollo";

interface FormValues {
  numDays: number;
  codeUrl: string;
  tags: string[];
  notes: string;
}

const CreateCodeReviewRequest = () => {
  return (
    <ProtectedRoute>
      <Head>
        <title>Create Code Review Request | Cofer</title>
      </Head>
      <Wrapper extraClassName="flex flex-col justify-center" mobileFull>
        <Formik<FormValues>
          initialValues={{ numDays: 3, codeUrl: "", tags: [], notes: "" }}
          onSubmit={async (values, { setErrors }) => {
            // if (res.data?.login.errors) {
            //   setErrors(toErrorMap(res.data.login.errors));
            // } else if (res.data?.login.user) {
            //   router.push("/");
            // }
          }}
        >
          {({ isSubmitting }) => (
            <MyForm width={500}>
              <Header centered size="3xl" fontWeight="bold">
                Create Code Review
              </Header>
              <InputField
                name="codeUrl"
                placeholder="github link"
                label="Github Link"
              />

              <InputField
                name="numDays"
                placeholder="number of the days"
                label="Number Of Days"
                type="number"
              />

              {/* TODO ADD HERE AUTOCOMPLETE FIELD */}

              <InputField
                textarea
                name="notes"
                placeholder="your notes"
                label="Notes"
              />

              <Button
                width={175}
                height={40}
                extraClassName="mt-4"
                loading={isSubmitting}
                centered
                type="submit"
              >
                Create
              </Button>
            </MyForm>
          )}
        </Formik>
      </Wrapper>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: false })(CreateCodeReviewRequest);

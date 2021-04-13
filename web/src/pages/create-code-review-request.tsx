import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCreateCodeReviewRequestMutation } from "../generated/graphql";
import Button from "../ui/Button";
import Header from "../ui/Header";
import InputField from "../ui/InputField";
import MultiSelectTags from "../ui/MultiSelectTags";
import MyForm from "../ui/MyForm";
import ProtectedRoute from "../ui/ProtectedRoute";
import Wrapper from "../ui/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface FormValues {
  numDays: number;
  codeUrl: string;
  tags: string[];
  notes: string;
}

const CreateCodeReviewRequest = () => {
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState("");
  const router = useRouter();
  const [createCodeRR] = useCreateCodeReviewRequestMutation();

  const handleOnChangeSelect = (res) => {
    if (res[res.length - 1]) setTags([...tags, res[res.length - 1].value]);
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Create Code Review Request | Cofer</title>
      </Head>
      <Wrapper extraClassName="flex flex-col justify-center" mobileFull>
        <Formik<FormValues>
          initialValues={{ numDays: 3, codeUrl: "", tags: [], notes: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(tags);
            const res = await createCodeRR({
              variables: {
                input: { ...values, tags },
              },
            });
            console.log(res);
            if (res.data?.createCodeReviewRequest.errors) {
              setErrors(toErrorMap(res.data.createCodeReviewRequest.errors));
              res.data.createCodeReviewRequest.errors.forEach((i) => {
                if (i.field === "tags") setTagsError(i.message);
              });
            } else if (res.data?.createCodeReviewRequest.ok) router.push("/");
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
              <MultiSelectTags onChange={handleOnChangeSelect} />

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

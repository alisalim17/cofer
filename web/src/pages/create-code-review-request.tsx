import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCreateCodeReviewRequestMutation } from "../generated/graphql";
import EmotePicker from "../ui/EmotePicker";
import Button from "../ui/Form/Button";
import MultiSelectTags from "../ui/Form/MultiSelectTags";
import MyForm from "../ui/Form/MyForm";
import InputField from "../ui/Form/TextField/InputField";
import Header from "../ui/Header";
import ProtectedRoute from "../ui/utilities/ProtectedRoute";
import Wrapper from "../ui/utilities/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface FormValues {
  numDays: number;
  codeUrl: string;
  tags: string[];
  notes: string;
}

const CreateCodeReviewRequest = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState("");
  const [tagsError, setTagsError] = useState("");
  const router = useRouter();
  const [createCodeRR] = useCreateCodeReviewRequestMutation();

  const handleOnChangeSelect = (res) => {
    if (res[res.length - 1]) setTags([...tags, res[res.length - 1].value]);
  };

  const handleOnClickEmojiWrapper = () => {
    setShowEmoji(!showEmoji);
  };

  console.log(notes);

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
                input: { ...values, tags, notes },
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
              <Header
                centered
                color="text-primary-100"
                size="3xl"
                fontWeight="bold"
              >
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

              {showEmoji ? (
                <EmotePicker notes={notes} setNotes={setNotes} />
              ) : null}
              <InputField
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                textarea
                name="notes"
                placeholder="your notes"
                label="Notes"
                wrapperClassName="flex"
              >
                <button onClick={handleOnClickEmojiWrapper} type="button">
                  emoji
                </button>
              </InputField>
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

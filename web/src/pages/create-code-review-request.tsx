import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useCreateCodeReviewRequestMutation } from "../generated/graphql";
import { useCreateCodeRRStore } from "../stores/useCreateCodeRRStore";
import { useEmojiPickerStore } from "../stores/useEmojiPickerStore";
import EmotePicker from "../ui/EmotePicker";
import Button from "../ui/Form/Button";
import MultiSelectTags from "../ui/Form/MultiSelectTags";
import MyForm from "../ui/Form/MyForm";
import InputField from "../ui/Form/TextField/InputField";
import Header from "../ui/Header";
import ProtectedRoute from "../ui/utilities/ProtectedRoute";
import Wrapper from "../ui/utilities/Wrapper";
import { useClickOutside } from "../utils/hooks/useClickOutside";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

function getDifference(a, b) {
  let i = 0;
  let j = 0;
  let result = "";

  while (j < b.length) {
    if (a[i] !== b[j] || i === a.length) result += b[j];
    else i += 1;
    j += 1;
  }
  return result;
}

interface FormValues {
  numDays: number;
  codeUrl: string;
  tags: string[];
  notes: string;
}

const CreateCodeReviewRequest = () => {
  const { open, setOpen } = useEmojiPickerStore();
  const { notes, tags, setNotes, setTags } = useCreateCodeRRStore();
  const router = useRouter();
  const [createCodeRR] = useCreateCodeReviewRequestMutation();

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      useClickOutside(wrapperRef, buttonRef, e.target, setOpen);
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const handleOnChangeSelect = (res) => {
    if (res[res.length - 1]) setTags([...tags, res[res.length - 1].value]);
  };

  const handleOnClickEmojiWrapper = async () => {
    console.log("open 1", open);
    await setOpen(!open);
    console.log("open 2", open);
  };

  const handleNotesOnChange = useDebouncedCallback((prevText, currText) => {
    console.log("fired");
    if (getDifference(prevText, currText) === ":") {
      setOpen(!open);
    }
  }, 1000);

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

              {open ? (
                <div ref={wrapperRef}>
                  <EmotePicker notes={notes} setNotes={setNotes} />
                </div>
              ) : null}
              <InputField
                value={notes}
                onChange={(e) => {
                  const prevText = notes;
                  setNotes(e.target.value);
                  handleNotesOnChange(prevText, e.target.value);
                }}
                textarea
                name="notes"
                placeholder="your notes"
                label="Notes"
                wrapperClassName="flex relative"
              >
                <div className="absolute bottom-0 right-1">
                  <button
                    ref={buttonRef}
                    onClick={handleOnClickEmojiWrapper}
                    type="button"
                  >
                    <svg
                      className="w-5 h-5 text-primary-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
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

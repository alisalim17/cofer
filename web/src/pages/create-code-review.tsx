import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { Smile } from "react-feather";
import { useDebouncedCallback } from "use-debounce";
import { useCreateReviewMutation } from "../generated/graphql";
import { useCreateCodeRRStore } from "../stores/useCreateCodeRRStore";
import { useEmojiPickerStore } from "../stores/useEmojiPickerStore";
import EmotePicker from "../ui/EmotePicker";
import Button from "../ui/Form/Button";
import MultiSelectTags from "../ui/Form/MultiSelectTags";
import MyForm from "../ui/Form/MyForm";
import InputField from "../ui/Form/TextField/InputField";
import Header from "../ui/Header";
import Logo from "../ui/Navbar/Logo";
import Link from "../ui/utilities/Link";
import ProtectedRoute from "../ui/utilities/ProtectedRoute";
import Wrapper from "../ui/utilities/Wrapper";
import { useClickOutside } from "../utils/hooks/useClickOutside";
import { getDifference } from "../utils/hooks/useGetDiff";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

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
  const [createCodeRR] = useCreateReviewMutation();

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

  const handleOnClickEmojiWrapper = async () => setOpen(!open);

  const handleNotesOnChange = useDebouncedCallback((prevText, currText) => {
    if (getDifference(prevText, currText) === ":") setOpen(!open);
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
            if (res.data?.createReview.errors) {
              setErrors(toErrorMap(res.data?.createReview.errors));
            } else if (res.data?.createReview.ok) router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <MyForm width={500}>
              <div className="flex justify-center mb-2">
                <Link href="/">
                  <Logo showText={false} />
                </Link>
              </div>

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
                    style={{ padding: 3 }}
                    className="focus:outline-no-chrome rounded-5 focus:ring-2"
                    ref={buttonRef}
                    onClick={handleOnClickEmojiWrapper}
                    type="button"
                  >
                    <Smile
                      className={`${open ? "text-accent" : "text-primary-200"}`}
                    />
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

import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import ProtectedRoute from "../../../src/ui/utilities/ProtectedRoute";
import Wrapper from "../../../src/ui/utilities/Wrapper";
import { useCreateOfferMutation } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import Button from "../../ui/Form/Button";
import MyForm from "../../ui/Form/MyForm";
import InputField from "../../ui/Form/TextField/InputField";
import Header from "../../ui/Header";
import Logo from "../../ui/Navbar/Logo";
import Link from "../../ui/utilities/Link";
import { toErrorMap } from "../../utils/toErrorMap";

interface FormValues {
  codeUrl: string;
}

const CreateOffer = () => {
  const router = useRouter();
  const [createOffer] = useCreateOfferMutation();

  return (
    <ProtectedRoute>
      <Head>
        <title>Create Offer | Cofer</title>
      </Head>
      <Wrapper extraClassName="flex flex-col justify-center" mobileFull>
        <Formik<FormValues>
          initialValues={{ codeUrl: "" }}
          onSubmit={async (values, { setErrors }) => {
            const res = await createOffer({
              variables: {
                input: { ...values, reviewId: router.query.reviewId as string },
              },
            });
            console.log(res);
            const errors = res.data?.createOffer.errors;
            if (errors) {
              setErrors(toErrorMap(errors));
            } else if (res.data?.createOffer.ok) router.push("/");
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
                Create Offer
              </Header>
              <InputField
                name="codeUrl"
                placeholder="enter code link"
                label="Code Link"
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

export default withApollo({ ssr: true })(CreateOffer);

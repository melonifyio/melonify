import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useAuthProvider } from "core/auth";
import { useDataProvider } from "core/data";
import { Form, FormFields } from "core/ui/form";
import { Timestamp } from "firebase/firestore";
import { commentSchema } from "schema";

type ComposeProps = {
  collectionId: string;
};

export function Compose(props: ComposeProps) {
  const { collectionId } = props;

  const { useProfile } = useAuthProvider();

  const [profile] = useProfile();

  const { useCreateDocument } = useDataProvider();

  const [postComment, isLoading] = useCreateDocument({ collectionId });

  const handleSubmit = (values: any) => {
    postComment(values);
  };

  return (
    <Form
      resetOnSubmit
      schema={commentSchema}
      initialValues={{
        content: "",
        createdBy: profile,
        createdAt: Timestamp.now(),
      }}
      onSubmit={handleSubmit}
      contentComponent={(props) => (
        <>
          <FormFields
            fields={{ content: { label: "Message", type: "TEXTAREA" } }}
            {...props}
          />

          <Stack direction="row" justifyContent="flex-end" my={2}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Comment
            </LoadingButton>
          </Stack>
        </>
      )}
    />
  );
}

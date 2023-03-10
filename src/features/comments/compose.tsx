import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useMe } from "features/auth/api/get-me";
import { useDataProvider } from "features/data";
import { Form, FormFields } from "features/forms";
import { Timestamp } from "firebase/firestore";
import { commentSchema } from "schema";

type ComposeProps = {
  collectionId: string;
};

export function Compose(props: ComposeProps) {
  const { collectionId } = props;

  const [me] = useMe();

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
        createdBy: me,
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

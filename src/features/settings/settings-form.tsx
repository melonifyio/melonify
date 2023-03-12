import React from "react";
import { EmptyState } from "core/ui/empty-state";

export function SettingsForm() {
  // const { useUpdateDocument, useDocument } = useDataProvider();

  return <EmptyState title="Coming soon..." />;

  // const [data, isLoading] = useDocument<SettingsModel>({
  //   collectionId: "settings",
  //   documentId: "general",
  // });

  // const [updateSettings, isUpdating] = useUpdateDocument({
  //   collectionId: "settings",
  //   documentId: "general",
  // });

  // if (isLoading) {
  //   return (
  //     <Stack
  //       direction="row"
  //       height="60vh"
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <CircularProgress size={24} />
  //     </Stack>
  //   );
  // }

  // return (
  //   <Form
  //     schema={settingsSchema}
  //     initialValues={{
  //       title: data?.title || "",
  //     }}
  //     onSubmit={updateSettings}
  //     contentComponent={(props) => (
  //       <Stack gap={2}>
  //         <FormFields
  //           fields={{
  //             title: {
  //               label: "Project title",
  //               type: "TEXT",
  //             },
  //           }}
  //           {...props}
  //         />

  //         <LoadingButton type="submit" variant="contained" loading={isUpdating}>
  //           Save
  //         </LoadingButton>
  //       </Stack>
  //     )}
  //   />
  // );
}

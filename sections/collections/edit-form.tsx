import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import {
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import LoadingButton from "@mui/lab/LoadingButton";

import Draggable from "../../components/dragndrop/draggable";
import Dropppable from "../../components/dragndrop/droppable";
import { FieldProps } from "../../components/form-field/types";
import Form from "../../components/form";

export type EditCollectionFormDataProps = {
  title: string;
  fields: FieldProps[];
};

type EditCollectionFormProps = {
  onSubmit: (values: EditCollectionFormDataProps) => void;
  isSubmitting: boolean;
  initialValues?: EditCollectionFormDataProps;
};

export default function EditCollectionForm(props: EditCollectionFormProps) {
  const { onSubmit, isSubmitting, initialValues } = props;

  return (
    <Form
      onSubmit={onSubmit}
      model={{ fields: [] }}
      initialValues={initialValues}
      isSubmitting={isSubmitting}
    />
  );

  //   return (
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <Stack gap={2} alignItems="flex-start">
  //         <Controller
  //           name="title"
  //           control={control}
  //           rules={{ required: true }}
  //           render={({ field }) => (
  //             <TextField
  //               label="Collection Name"
  //               error={errors.title?.type === "required"}
  //               {...field}
  //             />
  //           )}
  //         />

  //         <Dropppable onDragEnd={() => {}}>
  //           <List>
  //             {FIELDS.map((item, index) => (
  //               <Draggable
  //                 key={`item-${index}`}
  //                 id={`item-${index}`}
  //                 index={index}
  //               >
  //                 <ListItem disablePadding>
  //                   <ListItemButton>
  //                     <ListItemIcon>
  //                       <InboxIcon />
  //                     </ListItemIcon>
  //                     <ListItemText primary="Inbox" />
  //                   </ListItemButton>
  //                 </ListItem>
  //               </Draggable>
  //             ))}
  //           </List>
  //         </Dropppable>

  //         <LoadingButton
  //           type="submit"
  //           variant="contained"
  //           loading={isSubmitting}
  //           color="primary"
  //         >
  //           Create
  //         </LoadingButton>
  //       </Stack>
  //     </form>
  //   );
}

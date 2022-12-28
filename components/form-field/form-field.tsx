import * as React from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DraftsIcon from "@mui/icons-material/Drafts";

import { FieldProps } from "../form-field/types";
import FormModal from "../../sections/shared/form-modal";
import Droppable from "../../components/dragndrop/droppable";
import Draggable from "../../components/dragndrop/draggable";

type FormFieldProps = FieldProps & {
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
};

export default function FormField(props: FormFieldProps) {
  const { fieldKey, type, name, config, control, setValue, handleSubmit } =
    props;

  const renderField = ({ field }: any) => {
    // console.log(field);

    switch (type) {
      case "MAP":
        return (
          <Paper>
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Typography>{name}</Typography>

              <FormModal
                onSuccess={(data) => {
                  setValue(fieldKey, {
                    ...field.value,
                    [data.fieldKey]: data,
                  });
                }}
                model={config?.model || { fields: {} }}
              />
            </Stack>

            <Droppable onDragEnd={() => {}}>
              <List>
                {Object.keys(field.value || {}).map((fieldKey, index) => (
                  <Draggable key={fieldKey} id={fieldKey} index={index}>
                    <ListItemButton>
                      <ListItemIcon>
                        <DraftsIcon />
                      </ListItemIcon>
                      <ListItemText primary={field.value[fieldKey].name} />
                    </ListItemButton>
                  </Draggable>
                ))}
              </List>
            </Droppable>
          </Paper>
        );

      // TEXT
      default:
        return (
          <>
            <FormLabel htmlFor={fieldKey}>{name}</FormLabel>
            <Input id={fieldKey} {...field} />
          </>
        );
    }
  };

  return (
    <FormControl>
      <Controller name={fieldKey} control={control} render={renderField} />
      {/* <FormHelperText>Helper text</FormHelperText> */}
    </FormControl>
  );
}

import * as React from "react";
import { UseFormSetValue } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";

import { useUpload } from "hooks/useUpload";
import firebase from "services/firebase";

type FormUploadProps = {
  setValue: UseFormSetValue<any>;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
};

export const FormUpload = React.forwardRef<HTMLInputElement, FormUploadProps>(
  (props, ref) => {
    const { field } = props;

    const id = `file-${Date.now()}`;

    const uploader = useUpload({
      firebase,
      onSuccess: (imageUrl) => {
        field.onChange(imageUrl);
      },
    });

    const hanldeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files ? e.currentTarget.files[0] : null;

      const date = new Date();

      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (file) {
        uploader.upload(
          `${year}-${month}/${id}.${file.name.split(".").pop()}`,
          file
        );
      }
    };

    return (
      <Stack direction="row" gap={2} alignItems="center">
        <Avatar
          src={field.value}
          sx={{ width: 56, height: 56, borderRadius: 1 }}
        />
        <LoadingButton
          variant="contained"
          component="label"
          size="small"
          loading={uploader.uploading}
        >
          Upload
          <input
            ref={ref}
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={hanldeUpload}
          />
        </LoadingButton>
      </Stack>
    );
  }
);

FormUpload.displayName = "FormUpload";

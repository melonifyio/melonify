import * as React from "react";
import { UseFormSetValue } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";

import { useUpload } from "hooks/use-upload";
import firebase from "config/firebase";

type ImageUploadProps = {
  fieldKey: string;
  setValue: UseFormSetValue<any>;
  value: string;
};

export const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  (props, ref) => {
    const { fieldKey, setValue, value } = props;

    const id = `img-${Date.now()}`;

    const uploader = useUpload({
      firebase,
      onSuccess: (imageUrl) => {
        setValue(fieldKey, imageUrl);
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
        <Avatar src={value} sx={{ width: 56, height: 56, borderRadius: 1 }} />
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

ImageUpload.displayName = "ImageUpload";

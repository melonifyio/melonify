import * as React from "react";

import { LoadingButton } from "@mui/lab";
import Stack from "@mui/material/Stack";
import { Avatar, Box, Typography } from "@mui/material";
import { useUpload, firebase } from "core/firebase";

type FormUploadProps = {
  label: string;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
  errors: any;
};

export const FormUpload = React.forwardRef<HTMLInputElement, FormUploadProps>(
  (props, ref) => {
    const { field, label } = props;

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
      <Box>
        <Typography variant="body2" mb={1} sx={{ opacity: 0.6 }}>
          {label}
        </Typography>

        <Stack direction="row" gap={2} alignItems="center">
          <Avatar
            src={field.value}
            sx={{ width: 44, height: 44, borderRadius: 1 }}
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
      </Box>
    );
  }
);

FormUpload.displayName = "FormUpload";

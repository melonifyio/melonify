import * as React from "react";
import { UseFormSetValue } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useDocuments from "../../hooks/useDocuments";

type ComboBoxProps = {
  collectionName: string;
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
};

const ComboBox = React.forwardRef<HTMLInputElement, ComboBoxProps>(
  (props, ref) => {
    const { collectionName, label, name, setValue, ...rest } = props;

    const [enabled, setEnabled] = React.useState(false);

    const documents = useDocuments({ collectionName, enabled });

    // if (documents.isLoading) {
    //   return <>Loading...</>;
    // }

    return (
      <Autocomplete
        ref={ref}
        // disablePortal
        options={documents && documents.data ? documents.data : []}
        getOptionLabel={(option) => option.title}
        onOpen={() => setEnabled(true)}
        loading={documents.isLoading}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField variant="standard" {...params} label={label} />
        )}
        {...rest}
        onChange={(e, option) => {
          setValue(name, option);
        }}
      />
    );
  }
);

ComboBox.displayName = "ComboBox";

export { ComboBox };

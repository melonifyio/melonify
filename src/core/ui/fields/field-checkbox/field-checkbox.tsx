import { CheckBoxRounded } from "@mui/icons-material";

type FieldCheckboxProps = {
  checked: boolean;
};

export const FieldCheckbox = (props: FieldCheckboxProps) => {
  const { checked } = props;

  return checked ? (
    <CheckBoxRounded color="primary" />
  ) : (
    <CheckBoxRounded sx={{ opacity: 0.1 }} />
  );
};

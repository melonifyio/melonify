import { Chip } from "@mui/material";

type FieldEnumProps = {
  label: string;
};

const FieldEnum = (props: FieldEnumProps) => {
  const { label } = props;

  return <Chip label={label} />;
};

export default FieldEnum;

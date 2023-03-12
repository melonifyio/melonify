import { Chip } from "@mui/material";

type FieldChipProps = {
  label: string;
};

const FieldChip = (props: FieldChipProps) => {
  const { label } = props;

  return <Chip label={label} />;
};

export default FieldChip;

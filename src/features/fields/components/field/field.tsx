import { FieldType } from "features/fields/types";
import { convertTimestampToDate } from "utils/date";
import { FieldAvatar } from "../field-avatar";
import FieldBoolean from "../field-boolean/field-boolean";
import { FieldCheckbox } from "../field-checkbox";
import FieldEnum from "../field-chip/field-enum";
import { FieldImage } from "../field-image/field-image";
import FieldText from "../field-text/field-text";

const getAvatarValue = (value: string, target: any) => {
  if (typeof target === "object") {
    return target[value];
  } else {
    return value;
  }
};

type FieldProps = {
  type: keyof typeof FieldType;
  value: any;
  config?: any;
};

function renderComponent(
  type: keyof typeof FieldType,
  value: any,
  config?: any
) {
  switch (type) {
    case "TEXT":
      return <FieldText>{value}</FieldText>;
    case "NUMBER":
      return <FieldText>{value}</FieldText>;
    case "IMAGE":
      return <FieldImage src={value} title={value} />;
    case "AVATAR":
      const avatarValue = getAvatarValue(config.value, value);
      return <FieldAvatar src={avatarValue} title={avatarValue} />;
    case "BOOLEAN":
      return <FieldBoolean checked={value} />;
    case "CHECKBOX":
      return <FieldCheckbox checked={value} />;
    case "CHIP":
      return <FieldEnum label={value} />;
    case "REFERENCE":
      return <FieldText>{value[config?.optionLabel] || ""}</FieldText>;
    case "DATE":
      return (
        <FieldText>{convertTimestampToDate(value).toDateString()}</FieldText>
      );

    default:
      return <></>;
  }
}

export const Field = (props: FieldProps) => {
  const { type, value, config } = props;

  const component = renderComponent(type, value, config);

  return component;
};

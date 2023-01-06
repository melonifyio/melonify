import {
  FieldType,
  ModelProps,
  OptionsProps,
} from "../components/form-field/types";
import { optionModel } from "./option-model";

const fieldTypeOptions: OptionsProps = {};

Object.keys(FieldType).map((typeKey) => {
  fieldTypeOptions[typeKey] = {
    fieldKey: typeKey,
    name: typeKey,
  };
});

export const fieldModel: ModelProps = {
  fields: {
    type: {
      fieldKey: "type",
      name: "Type",
      type: "ENUM",
      config: {
        options: fieldTypeOptions,
      },
    },
    fieldKey: {
      fieldKey: "fieldKey",
      name: "Field Key",
      type: "TEXT",
    },
    name: {
      fieldKey: "name",
      name: "Name",
      type: "TEXT",
    },
    "config.required": {
      fieldKey: "config.required",
      name: "Required?",
      type: "BOOLEAN",
    },
    "config.options": {
      fieldKey: "config.options",
      name: "Options",
      type: "MAP",
      config: {
        model: optionModel,
      },
    },
  },
};

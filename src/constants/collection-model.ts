import { ModelProps } from "components/form-field/types";
import { fieldModel } from "./field-model";

export const collectionModel: ModelProps = {
  fields: {
    title: {
      fieldKey: "title",
      name: "Collection Name",
      type: "TEXT",
      config: {
        required: "Collection Name required.",
      },
    },
    schema: {
      fieldKey: "schema",
      name: "Schema",
      type: "MAP",
      config: {
        model: fieldModel,
      },
    },
  },
};

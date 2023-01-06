import { FieldType, ModelProps } from "../components/form-field/types";

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
        model: {
          fields: {
            type: {
              fieldKey: "type",
              name: "Type",
              type: "ENUM",
              config: {
                options: Object.keys(FieldType),
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
          },
        },
      },
    },
  },
};

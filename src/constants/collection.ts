import {
  FieldType,
  ModelProps,
  OptionsProps,
} from "features/forms/form-fields/types";
import { configFieldModel } from "./config-field-model";
import { optionModel } from "./option-model";

const fieldTypeOptions: OptionsProps = {};

Object.keys(FieldType).map((typeKey) => {
  fieldTypeOptions[typeKey] = {
    fieldKey: typeKey,
    name: typeKey,
  };
});

export const SCHEMA_MODEL: ModelProps = {
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
    conditional: {
      fieldKey: "type",
      values: ["ENUM"],
    },
  },
  "config.model": {
    fieldKey: "config.model",
    name: "Schema",
    type: "MAP",
    config: {
      model: configFieldModel,
    },
    conditional: {
      fieldKey: "type",
      values: ["SUBCOLLECTION", "MAP"],
    },
  },
  "config.collectionName": {
    fieldKey: "config.collectionName",
    name: "Collection Name",
    type: "TEXT",
    conditional: {
      fieldKey: "type",
      values: ["REFERENCE"],
    },
  },
};

export const COLLECTION_MODEL: ModelProps = {
  title: {
    fieldKey: "title",
    name: "Collection Name",
    type: "TEXT",
    config: {
      required: "Collection Name required.",
    },
  },
  collectionId: {
    fieldKey: "collectionId",
    name: "Collection ID",
    type: "TEXT",
    config: {
      required: "Collection ID required.",
    },
  },
  schema: {
    fieldKey: "schema",
    name: "Schema",
    type: "MAP",
    config: {
      model: SCHEMA_MODEL,
    },
  },
};

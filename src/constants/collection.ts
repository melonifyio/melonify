import {
  FieldType,
  ModelProps,
  OptionsProps,
} from "components/forms/form-fields/types";

const FIELD_TYPES_MODEL: OptionsProps = {};
const FIELD_TYPES_MODEL_WITHOUT_SUBCOLLECTION: OptionsProps = {}; // temp solution not to have a 2 level nested subcollection

Object.keys(FieldType).map((typeKey) => {
  FIELD_TYPES_MODEL[typeKey] = {
    fieldKey: typeKey,
    name: typeKey,
  };

  if (typeKey !== "SUBCOLLECTION") {
    FIELD_TYPES_MODEL_WITHOUT_SUBCOLLECTION[typeKey] = {
      fieldKey: typeKey,
      name: typeKey,
    };
  }
});

export const OPTION_MODEL: ModelProps = {
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
};

export const NESTED_SCHEMA_MODAL: ModelProps = {
  type: {
    fieldKey: "type",
    name: "Type",
    type: "ENUM",
    config: {
      options: FIELD_TYPES_MODEL_WITHOUT_SUBCOLLECTION,
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
      model: OPTION_MODEL,
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
      model: {},
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

export const SCHEMA_MODEL: ModelProps = {
  type: {
    fieldKey: "type",
    name: "Type",
    type: "ENUM",
    config: {
      options: FIELD_TYPES_MODEL,
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
      model: OPTION_MODEL,
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
      model: NESTED_SCHEMA_MODAL,
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

import { ModelProps } from "components/form-fields/types";

export const appModel: ModelProps = {
  logo: { fieldKey: "logo", name: "Logo", type: "IMAGE" },
  title: { fieldKey: "title", name: "Title", type: "TEXT" },
  apiKey: {
    fieldKey: "apiKey",
    name: "API Key",
    type: "TEXT",
  },
  projectId: {
    fieldKey: "projectId",
    name: "Project ID",
    type: "TEXT",
  },
  appId: {
    fieldKey: "appId",
    name: "App ID",
    type: "TEXT",
  },
};

import { Theme } from "@mui/material";

import Card from "./card";
import Button from "./button";
import Input from "./input";
import FormLabel from "./form-label";
import List from "./list";

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Card(theme),
    Button(theme),
    Input(theme),
    FormLabel(theme),
    List(theme)
  );
}

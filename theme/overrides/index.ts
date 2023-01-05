import Card from "./card";
import Button from "./button";
import Input from "./input";

export default function ComponentsOverrides(theme: any) {
  return Object.assign(Card(theme), Button(theme), Input(theme));
}

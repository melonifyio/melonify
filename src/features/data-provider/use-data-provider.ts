import { useContext } from "react";
import { DataContext } from "./data-provider";

export const useDataProvider = () => useContext(DataContext);

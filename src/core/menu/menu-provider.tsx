import React from "react";
import * as icons from "@mui/icons-material";

export type MenuContextProps = {
  data?: {
    regular: MenuItemProps[];
    footer: MenuItemProps[];
  };
};

export const MenuContext = React.createContext<MenuContextProps>({});

export type MenuItemProps = {
  title: string;
  path: string;
  icon: keyof typeof icons;
  home?: boolean;
  open?: boolean;
  rolesAllowed?: string[];
};

export type MenuProviderProps = {
  children: React.ReactNode;
  data?: {
    regular: MenuItemProps[];
    footer: MenuItemProps[];
  };
};

export const MenuProvider: React.FC<MenuProviderProps> = ({
  children,
  data,
}) => {
  const contextValue = { data } || {};

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export const useMenu = () => React.useContext(MenuContext);

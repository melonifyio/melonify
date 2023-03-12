import React from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

import Melonify from "core/melonify";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const mainContent = getLayout(<Component {...pageProps} />);

  return (
    <Melonify
      menu={{
        regular: [
          {
            path: "/tasks",
            title: "Tasks",
            icon: "Task",
            rolesAllowed: ["OWNER", "ADMIN", "MEMBER"],
          },
        ],
        footer: [
          { path: "/settings/members", title: "Members", icon: "People" },
          { path: "/settings", title: "Settings", icon: "Settings" },
        ],
      }}
    >
      {mainContent}
    </Melonify>
  );
}

import * as React from "react";
import { UseQueryResult } from "react-query";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { doc as fsdoc } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import defaultFirebase from "../firebase";
import firestore from "../firebase/firestore";

type AppDataProps = {
  id: string;
  title: string;
  logo?: string;
};

type AppContextProps = {
  appData?: AppDataProps;
  firebase: FirebaseApp;
};

export const AppContext = React.createContext<AppContextProps>({
  firebase: defaultFirebase,
});

type AppProviderProps = {
  appId: string;
  children: React.ReactNode;
};

export default function AppProvider(props: AppProviderProps) {
  const { children, appId } = props;

  const ref = fsdoc(firestore, "apps", appId);
  const app = useFirestoreDocumentData(["apps", appId], ref);

  if (app.isLoading) {
    return (
      <Stack
        direction="row"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (!app.data) return <div>app not found</div>;

  return (
    <AppProviderWithFirebase appData={app.data} appId={appId}>
      {children}
    </AppProviderWithFirebase>
  );
}

const AppProviderWithFirebase = React.memo(
  ({
    appId,
    appData,
    children,
  }: {
    appId: string;
    appData: any;
    children: React.ReactNode;
  }) => {
    const firebase = React.useMemo(() => {
      const firebaseConfig = {
        apiKey: appData.apiKey,
        authDomain: `${appData.projectId}.firebaseapp.com`,
        projectId: appData.projectId,
        storageBucket: `${appData.projectId}.appspot.com`,
        appId: appData.appId,
      };

      return initializeApp(firebaseConfig, appId);
    }, [appId, appData.apiKey, appData.appId, appData.projectId]);

    console.log("app rendered");

    const value = {
      appData: {
        id: appId,
        ...appData,
      },
      firebase,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
  }
);

AppProviderWithFirebase.displayName = "MelonifyApp";

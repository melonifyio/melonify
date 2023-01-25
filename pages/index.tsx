import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { api } from "../services";

import Container from "@mui/material/Container";

import Simple from "../layouts/simple";

import firestore from "../firebase/firestore";
import CollectionList from "../sections/collection-list/collection-list";
import useMe from "../hooks/useMe";
import functions from "../firebase/functions";

const options = {
  headers: { "Content-Type": "application/json" },
};

const fetchProjects = () => {
  return api.get("https://firebase.googleapis.com/v1beta1/availableProjects");
};

export default function AppsPage() {
  const router = useRouter();
  const me = useMe();

  // const getProjectList = httpsCallable(functions, "getProjectList");

  const projects = useQuery(["firebase-projects"], fetchProjects);

  console.log(projects);

  return (
    <Container maxWidth="md">
      <CollectionList
        firestore={firestore}
        title="Apps"
        collectionName="apps"
        constraints={[where("owner.uid", "==", me.data?.uid)]}
        model={{
          fields: {
            title: {
              fieldKey: "title",
              name: "Title",
              type: "TEXT",
              config: {
                required: true,
              },
            },
          },
        }}
        onClickItem={(item) => {
          router.push(`/app/${item._id}`);
        }}
      />
    </Container>
  );
}

AppsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Simple>{page}</Simple>
    </>
  );
};

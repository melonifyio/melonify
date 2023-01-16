import Head from "next/head";
import { useRouter } from "next/router";
import { where } from "firebase/firestore";

import Container from "@mui/material/Container";

import Simple from "../layouts/simple";

import firestore from "../firebase/firestore";
import CollectionList from "../sections/collection-list/collection-list";
import useMe from "../hooks/useAuth";

export default function AppsPage() {
  const router = useRouter();
  const me = useMe();

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

import * as React from "react";
import { useRouter } from "next/router";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreDocumentDeletion,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore";
import {
  collection,
  doc,
  Timestamp,
  query,
  onSnapshot,
} from "firebase/firestore";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import { SmartList } from "components/list/list";
import { AlertDialog } from "components/alert-dialog";
import { CollectionListProps, CollectionListItemProps } from "./types";
import FormModal from "components/form-modal";
import removeEmpty from "utils/remove-empty";
import useMe from "hooks/use-me";

function ActionComponent<T>(props: CollectionListItemProps<T>) {
  const {
    model,
    item,
    firestore,
    collectionName,
    onUpdateSuccess,
    onDeleteSuccess,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

  const ref = doc(firestore, collectionName, item._id);
  const updateMutation = useFirestoreDocumentMutation(ref);
  const deleteMutation = useFirestoreDocumentDeletion(ref);

  const handleUpdate = (data: any) => {
    updateMutation.mutate(removeEmpty(data), {
      onSuccess: () => {
        setOpen(false);
        onUpdateSuccess && onUpdateSuccess();
      },
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        onDeleteSuccess && onDeleteSuccess();
        setOpenAlertDialog(false);
      },
    });
  };

  return (
    <Stack direction="row" gap={1}>
      <FormModal
        onSubmit={handleUpdate}
        isSubmitting={updateMutation.isLoading}
        open={open}
        onTriggerClick={() => setOpen(true)}
        onClose={() => setOpen(false)}
        initialValues={item}
        model={model}
        TriggerComponent={
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        }
      />

      <AlertDialog
        open={openAlertDialog}
        onClose={() => {
          setOpenAlertDialog(false);
        }}
        isSubmitting={deleteMutation.isLoading}
        title="Are you sure?"
        description="Are you sure you want to delete this item?"
        onConfirm={handleDelete}
        TriggerComponent={
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              setOpenAlertDialog(true);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        }
      />
    </Stack>
  );
}

export default function CollectionList(props: CollectionListProps) {
  const { firestore, collectionName, model, title, onClickItem, constraints } =
    props;

  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const me = useMe();

  const collectionRef = collection(firestore, collectionName);
  const q = query(collectionRef, ...(constraints || []));

  // Provide the query to the hook
  const documents = useFirestoreQueryData([collectionName, constraints], q, {
    idField: "_id",
    subscribe: true,
  });

  const mutation = useFirestoreCollectionMutation(collectionRef);

  const timestampsValues = {
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    owner: {
      uid: me?.data?.uid,
      email: me?.data?.email,
      displayName: me?.data?.displayName,
      photoURL: me?.data?.photoURL,
    },
  };

  const handleCreate = (data: any) => {
    mutation.mutate(removeEmpty({ ...data, ...timestampsValues }), {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  // React.useEffect(() => {
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });

  //   return () => unsubscribe();
  // }, [q]);

  if (documents.isLoading)
    return (
      <Stack direction="row" alignItems="center" justifyContent="center">
        <CircularProgress size={24} />
      </Stack>
    );

  if (documents.data) {
    return (
      <SmartList<any>
        title={title || ""}
        items={documents.data || []}
        onClickItem={onClickItem}
        squareAvatar
        CreateComponent={
          <FormModal
            open={open}
            onSubmit={handleCreate}
            onClose={() => setOpen(false)}
            onTriggerClick={() => setOpen(true)}
            isSubmitting={mutation.isLoading}
            model={model}
            TriggerComponent={<Button startIcon={<AddIcon />}>Create</Button>}
          />
        }
        ActionComponent={(item) => (
          <ActionComponent
            model={model}
            item={item}
            firestore={firestore}
            collectionName={collectionName}
            onUpdateSuccess={() => {}}
            onDeleteSuccess={() => {}}
          />
        )}
      />
    );
  }

  return null;
}

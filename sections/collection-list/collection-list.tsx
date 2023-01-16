import { useRouter } from "next/router";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreDocumentDeletion,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore";
import { collection, doc, Timestamp, query } from "firebase/firestore";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import { SmartList } from "../../components/list/list";
import { AlertDialog } from "../../components/alert-dialog";
import { CollectionListProps, CollectionListItemProps } from "./types";
import FormModal from "../form-modal";
import { ModelProps } from "../../components/form-field/types";
import removeEmpty from "../../utils/remove-empty";
import useMe from "../../hooks/useAuth";

function ActionComponent<T>(props: CollectionListItemProps<T>) {
  const { model, item, firestore, collectionName, refetch } = props;

  const ref = doc(firestore, collectionName, item._id);
  const mutation = useFirestoreDocumentMutation(ref);

  const deleteMutation = useFirestoreDocumentDeletion(ref);

  const handleUpdateSuccess = (data: any) => {
    mutation.mutate(removeEmpty(data), {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  const handleDeleteSuccess = () => {
    deleteMutation.mutate();
    refetch();
  };

  return (
    <Stack direction="row" gap={1}>
      <FormModal
        onSuccess={handleUpdateSuccess}
        initialValues={item}
        model={model}
        TriggerComponent={
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        }
      />

      <AlertDialog
        title="Are you sure?"
        description="Are you sure you want to delete this item?"
        onConfirm={handleDeleteSuccess}
        TriggerComponent={
          <IconButton aria-label="delete">
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

  const router = useRouter();
  const me = useMe();

  const collectionRef = collection(firestore, collectionName);
  const q = query(collectionRef, ...(constraints || []));

  // Provide the query to the hook
  const documents = useFirestoreQueryData([collectionName, constraints], q, {
    idField: "_id",
    subscribe: true,
  });

  const mutation = useFirestoreCollectionMutation(
    collection(firestore, collectionName)
  );

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

  const handleCreateSuccess = (data: any) => {
    mutation.mutate(removeEmpty({ ...data, ...timestampsValues }));
  };

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
            onSuccess={handleCreateSuccess}
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
            refetch={documents.refetch}
          />
        )}
      />
    );
  }

  return null;
}

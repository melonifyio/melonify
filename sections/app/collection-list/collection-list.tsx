import { useRouter } from "next/router";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
  useFirestoreDocumentDeletion,
} from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import useApps from "../../../hooks/useApps";
import { SmartList } from "../../../components/list/list";
import { AlertDialog } from "../../../components/alert-dialog";
import { CollectionListProps, CollectionListItemProps } from "./types";
import FormModal from "../../shared/form-modal";
import { ModelProps } from "../../../components/form-field/types";

function ActionComponent<T>(props: CollectionListItemProps<T>) {
  const { model, item, firestore, collectionName, refetch } = props;

  const ref = doc(firestore, collectionName, item.id);
  const mutation = useFirestoreDocumentMutation(ref);

  const deleteMutation = useFirestoreDocumentDeletion(ref);

  const handleUpdateSuccess = (data: any) => {
    mutation.mutate(data, {
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
        Trigger={
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        }
      />

      <AlertDialog
        title="Are you sure?"
        description="Are you sure you want to delete this item?"
        onConfirm={handleDeleteSuccess}
        Trigger={
          <IconButton aria-label="delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        }
      />
    </Stack>
  );
}

export default function CollectionList(props: CollectionListProps) {
  const { firestore, collectionName, model } = props;

  const apps = useApps();
  const router = useRouter();

  const ref = collection(firestore, collectionName);
  const mutation = useFirestoreCollectionMutation(ref);

  const handleCreateSuccess = (data: any) => {
    mutation.mutate(data);
  };

  if (apps.isLoading)
    return (
      <Stack direction="row" alignItems="center" justifyContent="center">
        <CircularProgress size={24} />
      </Stack>
    );

  if (apps.data) {
    return (
      <SmartList
        title="Apps"
        items={apps.data.map((item) => ({
          id: item._id,
          title: item.title,
        }))}
        onClickItem={(item) => {
          router.push(`/app/${item.id}`);
        }}
        model={{
          fields: {
            title: {
              fieldKey: "title",
              name: "Title",
              type: "TEXT",
            },
          },
        }}
        CreateComponent={
          <FormModal
            onSuccess={handleCreateSuccess}
            model={model}
            Trigger={<Button startIcon={<AddIcon />}>Create app</Button>}
          />
        }
        ActionComponent={(item) => (
          <ActionComponent
            model={model}
            item={item}
            firestore={firestore}
            collectionName={collectionName}
            refetch={apps.refetch}
          />
        )}
      />
    );
  }

  return null;
}

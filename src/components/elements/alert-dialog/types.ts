export type AlertDialogProps = {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  isSubmitting?: boolean;
};

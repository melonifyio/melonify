export type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  isSubmitting?: boolean;
};

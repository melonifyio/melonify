export type AlertDialogProps = {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  TriggerComponent: JSX.Element;
  isSubmitting?: boolean;
};

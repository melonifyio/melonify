export type AlertDialogProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  TriggerComponent: JSX.Element;
};

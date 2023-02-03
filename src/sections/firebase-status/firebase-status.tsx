import React from "react";

import Chip from "@mui/material/Chip";

import { useFirestoreStatus } from "hooks/use-firestore-status";

export default function FirebaseStatus() {
  const firestoreStatus = useFirestoreStatus();

  const renderStatusLabel = () => {
    if (firestoreStatus.isLoading) return "Checking...";
    if (firestoreStatus.connected) return "Firestore connected";
    if (!firestoreStatus.connected) return "Firestore not connected";
  };

  return (
    <div>
      <Chip
        label={renderStatusLabel()}
        color={firestoreStatus.connected ? "success" : undefined}
      />
    </div>
  );
}

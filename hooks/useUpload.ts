import { useState } from "react";
import { FirebaseApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

type UseUploadProps = {
  firebase: FirebaseApp;
  onSuccess: (downloadURL: string) => void;
};

export function useUpload({ firebase, onSuccess }: UseUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState<{ downloadURL: string }[]>([]);
  const storage = getStorage(firebase);

  const upload = (path: string, file: File) => {
    const storageRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            setUploading(false);
            break;
          case "running":
            setUploading(true);
            break;
        }
      },
      (error) => {
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData([...data, { downloadURL }]);
          onSuccess(downloadURL);
        });

        setUploading(false);
      }
    );
  };

  return { upload, uploading, data };
}

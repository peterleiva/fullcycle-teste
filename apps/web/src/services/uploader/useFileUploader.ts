import { useEffect, useState } from "react";
import { type Progress } from "./FileWithProgress";
import { uploadFile } from "./uploader";
import useFileQueue from "./useFileQueue";

type Options = {
  onProgress: (event: Progress) => void;
};

export default function useFileUploader({ onProgress }: Partial<Options> = {}) {
  const queueState = useFileQueue();

  const { current, dequeue } = queueState;
  const [status, setStatus] = useState<Progress>();

  useEffect(() => {
    (async () => {
      if (current) {
        try {
          await uploadFile(current.file, (event: ProgressEvent) => {
            current.progress.loaded = event.loaded;
            current.progress.total = event.total;

            setStatus((progress) => ({ ...progress, ...current.progress }));
          });

          if (current.isDone()) {
            current.progress.done = true;
            dequeue();
          }
        } catch (error) {
          current.progress.error = true;
          console.error(error);
        }
      }
    })();
  }, [current, dequeue, onProgress]);

  useEffect(() => {
    if (status) onProgress?.(status);
  }, [onProgress, status]);

  return { ...queueState, status };
}

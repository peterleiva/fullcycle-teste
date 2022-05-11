import { useEffect, useState } from "react";
import { uploadFile } from "./uploader";
import useFileQueue, { type Progress } from "./useFileQueue";

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
        await uploadFile(current.file, (event: ProgressEvent) => {
          current.progress.loaded = event.loaded;
          current.progress.total = event.total;

          setStatus((progress) => ({ ...progress, ...current.progress }));
        });

        if (current.isDone()) {
          dequeue();
        }
      }
    })();
  }, [current, dequeue, onProgress]);

  useEffect(() => {
    if (status) onProgress?.(status);
  }, [onProgress, status]);

  return { ...queueState, status };
}

import { useCallback, useReducer } from "react";
import { remove, concat, head } from "ramda";
import FileWithProgress from "./FileWithProgress";

export type Progress = {
  total: number;
  loaded: number;
  done: boolean;
};

type Action =
  | { type: "ENQUEUE"; data: FileWithProgress[] }
  | { type: "NEXT" }
  | { type: "CLEAR_PROCESSED" };

type State = {
  current?: FileWithProgress;
  processed: FileWithProgress[];
  queue: FileWithProgress[];
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ENQUEUE": {
      const { queue, current } = state;

      return {
        ...state,
        current: current ?? head(action.data),
        queue: current
          ? concat(queue, action.data)
          : concat(queue, remove(0, 1, action.data)),
      };
    }

    case "NEXT": {
      const { queue, processed, current } = state;

      return {
        ...state,
        current: head(queue),
        processed: concat(processed, current ? [current] : []),
        queue: remove(0, 1, queue),
      };
    }

    case "CLEAR_PROCESSED": {
      return {
        ...state,
        processed: [],
      };
    }

    default:
      throw new Error("Invalid useFileQueue operation");
  }
}

export default function useFileQueue() {
  const [{ queue, processed, current }, dispatch] = useReducer(reducer, {
    queue: [],
    processed: [],
  });

  const enqueue = useCallback(
    (...files: File[]) =>
      dispatch({
        type: "ENQUEUE",
        data: files.map(
          (file) => new FileWithProgress(file, { total: file.size, loaded: 0 })
        ),
      }),
    []
  );

  const dequeue = useCallback(() => {
    dispatch({ type: "NEXT" });
  }, []);

  const cleanup = useCallback(() => {
    dispatch({ type: "CLEAR_PROCESSED" });
  }, []);

  const files = processed.concat(current ?? []).concat(queue);

  return {
    queue,
    processed,
    current,
    files,
    enqueue,
    dequeue,
    cleanup,
    progress: {
      total: files.reduce((prev, current) => prev + current.file.size, 0),
      loaded: processed.reduce((prev, current) => prev + current.file.size, 0),
      done: processed.length > 0 && !current && queue.length <= 0,
    },
  };
}

import { useCallback, useReducer } from "react";
import { remove, concat, head } from "ramda";

type IFile = FileWithProgress;

export type Progress = {
  total: number;
  loaded: number;
  done: boolean;
};

class FileWithProgress {
  private _progress: Progress;
  private _file: File;

  constructor(
    file: File,
    { total = Infinity, loaded = 0, done = false }: Partial<Progress> = {}
  ) {
    this._file = file;
    this._progress = { total, loaded, done };
  }

  get progress() {
    return this._progress;
  }

  get file() {
    return this._file;
  }

  isDone() {
    return this._progress.total - this._progress.loaded <= 0;
  }
}

type Action = { type: "ENQUEUE"; data: IFile[] } | { type: "NEXT" };

type State = {
  current?: IFile;
  processed: IFile[];
  queue: IFile[];
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

  const files = processed.concat(current ?? []).concat(queue);

  return {
    queue,
    processed,
    current,
    files,
    enqueue,
    dequeue,
    progress: {
      total: files.reduce((prev, current) => prev + current.file.size, 0),
      loaded: processed.reduce((prev, current) => prev + current.file.size, 0),
      done: processed.length > 0 && !current && queue.length <= 0,
    },
  };
}

export type Progress = {
  total: number;
  loaded: number;
  done: boolean;
  error: boolean;
};

export default class FileWithProgress {
  private _progress: Progress;
  private _file: File;

  constructor(
    file: File,
    {
      total = Infinity,
      loaded = 0,
      done = false,
      error = false,
    }: Partial<Progress> = {}
  ) {
    this._file = file;
    this._progress = { total, loaded, done, error };
  }

  get progress() {
    return this._progress;
  }

  get file() {
    return this._file;
  }

  isDone() {
    return (
      !this._progress.error && this._progress.total - this._progress.loaded <= 0
    );
  }
}

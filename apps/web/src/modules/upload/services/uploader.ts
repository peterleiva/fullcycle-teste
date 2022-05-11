import { httpClientFactory } from "../../../lib";

type onUploadProgressHandler = {
  (progressEvent: any): void;
};

export function uploadFile<TFile extends File>(
  file: TFile,
  onUploadProgress: onUploadProgressHandler
) {
  const data = new FormData();

  data.append("file", file);

  const http = httpClientFactory({
    onUploadProgress,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).post("/upload", data);

  return http;
}

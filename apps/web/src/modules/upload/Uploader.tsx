import {
  VscFolderOpened as DropIcon,
  VscFolder as DragIcon,
} from "react-icons/vsc";
import {
  MdOutlineDone as DoneIcon,
  MdErrorOutline as FailedIcon,
} from "react-icons/md";
import ReactLoading from "react-loading";
import {
  Button,
  Dropzone,
  DropzoneContent,
  Modal,
  Progress,
  UploaderProgress,
} from "../../components";
import type FileWithProgress from "./FileWithProgress";
import useFileUploader from "./useFileUploader";

export default function Uploader() {
  const {
    enqueue,
    current,
    files,
    cleanup,
    processed,
    progress: { total, loaded, done },
    status,
  } = useFileUploader();

  const getIcon = (file: FileWithProgress) => {
    return file.progress.error ? (
      <FailedIcon />
    ) : file.progress.done ? (
      <DoneIcon />
    ) : (
      file.file === current?.file && (
        <ReactLoading type="spin" color="#000000" width={20} height={20} />
      )
    );
  };

  return (
    <div>
      <Dropzone
        renderDragActive={
          <DropzoneContent Icon={DropIcon}>Drop files here ...</DropzoneContent>
        }
        renderContent={
          <DropzoneContent Icon={DragIcon}>
            Drag your documents, photos, videos or any other kind to start
            uploading.
            <Button className="self-center">Browse files</Button>
          </DropzoneContent>
        }
        onDrop={(files) => enqueue(...files)}
      />
      {files.length > 0 && (
        <UploaderProgress
          loaded={loaded}
          total={total}
          done={done}
          className="mb-4 w-2/3"
        />
      )}

      <Modal title={`File upload progress (${files.length})`}>
        <div className="flex flex-col gap-4">
          {files.map((currentFile, index) => {
            const { file, progress: fileProgress } = currentFile;

            return (
              <div className="flex items-center gap-2" key={file.name + index}>
                {getIcon(currentFile)}
                <Progress
                  max={
                    file === current?.file ? status?.total : fileProgress.total
                  }
                  value={
                    file === current?.file
                      ? status?.loaded
                      : fileProgress.loaded
                  }
                >
                  {file.name}
                </Progress>
              </div>
            );
          })}

          {processed.length > 0 && (
            <Button
              variant="outlined"
              size="sm"
              onClick={cleanup}
              className="self-start"
            >
              clear
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
}

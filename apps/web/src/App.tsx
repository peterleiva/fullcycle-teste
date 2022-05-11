import clsx from "clsx";
import { Dropzone, DropzoneContent, Button, Progress } from "./components";
import {
  VscFolderOpened as DropIcon,
  VscFolder as DragIcon,
} from "react-icons/vsc";
import ReactLoading from "react-loading";
import {
  MdOutlineDone as DoneIcon,
  MdErrorOutline as FailedIcon,
} from "react-icons/md";
import { useFileUploader } from "./services";
import Modal from "./components/Modal";
import FileWithProgress from "./services/uploader/FileWithProgress";

function App() {
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
    <div className="m-20">
      <PageTitle
        className="mb-10"
        title="File Uploader"
        description="Inicie upando seus arquivos."
      />
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
        onDrop={(files) => {
          enqueue(...files);
        }}
      />
      {files.length > 0 && (
        <div className="flex mb-4 p-2 bg-sky-100 w-2/3 mx-auto justify-center">
          <Progress max={total} value={loaded}>
            {done ? <DoneIcon /> : Math.round((loaded / total) * 100) + "%"}
          </Progress>
        </div>
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

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
}

const PageTitle = ({ title, description, className }: PageTitleProps) => {
  return (
    <header className={clsx("text-center", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="mt-2">{description}</p>}
    </header>
  );
};

export default App;

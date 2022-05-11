import clsx from "clsx";
import { Dropzone, DropzoneContent, Button, Progress } from "./components";
import {
  VscFolderOpened as DropIcon,
  VscFolder as DragIcon,
} from "react-icons/vsc";
import { MdOutlineDone as DoneIcon } from "react-icons/md";
import { useFileUploader } from "./services";

function App() {
  const {
    enqueue,
    current,
    files,
    progress: { total, loaded, done },
    status,
  } = useFileUploader();

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

      <div>
        {files.map(({ file, progress: fileProgress }, index) => (
          <Progress
            key={file.name + index}
            max={file === current?.file ? status?.total : fileProgress.total}
            value={
              file === current?.file ? status?.loaded : fileProgress.loaded
            }
          >
            {file.name}
          </Progress>
        ))}
      </div>
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

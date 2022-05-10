import clsx from "clsx";
import { Dropzone, DropzoneContent, Button } from "./components";
import {
  VscFolderOpened as DropIcon,
  VscFolder as DragIcon,
} from "react-icons/vsc";

function App() {
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
      />
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

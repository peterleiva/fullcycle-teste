import {
  type DropEvent,
  useDropzone,
  type FileRejection,
} from "react-dropzone";

interface DropzoneProps {
  renderDragActive?: React.ReactNode;
  renderContent?: React.ReactNode;
  onDrop?: onDropHandler;
}

type onDropHandler = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;

export default function Dropzone({
  renderDragActive,
  renderContent,
  onDrop,
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className:
          "flex flex-col items-center border rounded-md p-8 bg-blue-50 border-dashed border-4 border-gray-200",
      })}
    >
      <>
        <input {...getInputProps()} />
        {isDragActive ? renderDragActive : renderContent}
      </>
    </div>
  );
}

import clsx from "clsx";
import { MdOutlineDone as DoneIcon } from "react-icons/md";
import Progress from "./Progress";

export default function UploaderProgress({
  done,
  total,
  loaded,
  className,
}: {
  done: boolean;
  total: number;
  loaded: number;
  className?: string;
}) {
  const percentage = Math.round((loaded / total) * 100);

  return (
    <div
      className={clsx("flex p-2 bg-sky-100 mx-auto justify-center", className)}
    >
      <Progress max={total} value={loaded}>
        {done ? <DoneIcon /> : `${percentage} %`}
      </Progress>
    </div>
  );
}

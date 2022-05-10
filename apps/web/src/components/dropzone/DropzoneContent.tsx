import clsx from "clsx";
import { type IconType } from "react-icons";

interface DropzoneContentProps {
  Icon?: IconType;
  children?: React.ReactNode;
  className?: string;
}

export default function DropzoneContent({
  Icon,
  children,
  className,
}: DropzoneContentProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 items-center text-slate-600 font-bold",
        className
      )}
    >
      {Icon && <Icon size="4rem" />}
      {children}
    </div>
  );
}

import { useState } from "react";
import clsx from "clsx";
import {
  FiMaximize as MaximizeIcon,
  FiMinimize2 as MinimizeIcon,
} from "react-icons/fi";
import { IconButton } from "./Button";

const useToogle = (initial = false) => {
  const [on, setOn] = useState(initial);

  return {
    on,
    off: !on,
    toggle: () => setOn(!on),
    turnOff: () => setOn(false),
    turnOn: () => setOn(true),
  };
};

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  position?: keyof typeof positions;
}

export default function Modal({
  children,
  onClose,
  title,
  position = "bottomRight",
}: ModalProps) {
  const { toggle, on: minimized } = useToogle(false);

  const minimizeHandler = () => {
    onClose?.();
    toggle();
  };

  return (
    <div
      className={clsx(
        "flex flex-col rounded-lg fixed max-w-[90vw]",
        positions[position]
      )}
    >
      <header
        className="p-4 bg-sky-400 text-gray-50 font-bold flex justify-between items-center gap-5 pointer"
        onClick={minimizeHandler}
      >
        <h1>{title}</h1>
        <IconButton size="lg">
          {minimized ? <MaximizeIcon /> : <MinimizeIcon />}
        </IconButton>
      </header>
      {!minimized && (
        <div className="p-4 bg-sky-100 overflow-x-auto">{children}</div>
      )}
    </div>
  );
}

const positions = {
  bottomRight: "bottom-5 right-5",
};

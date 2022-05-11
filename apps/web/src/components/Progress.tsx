type ProgressProps = JSX.IntrinsicElements["progress"] & {
  label?: string;
  children?: React.ReactNode;
};

export default function Progress({
  label,
  children,
  ...progressProps
}: ProgressProps) {
  return (
    <div className="flex flex-row items-center gap-3">
      <progress
        id={label}
        className="bg-sky-500 text-sky-400"
        {...progressProps}
      ></progress>
      <label htmlFor={label}>{children}</label>
    </div>
  );
}

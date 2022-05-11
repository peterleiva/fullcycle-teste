import clsx from "clsx";

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className,
}: PageTitleProps) {
  return (
    <header className={clsx("text-center", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {description && <p className="mt-2">{description}</p>}
    </header>
  );
}

import clsx from "clsx";
import Link, { LinkProps } from "next/link";

interface test {
  className?: string;
  children: any;
}

export const CustomLink = ({
  className,
  children,
  ...props
}: LinkProps & test) => {
  return (
    <p className={clsx("text-indigo-600 hover:text-indigo-900", className)}>
      <Link {...props}>{children}</Link>
    </p>
  );
};

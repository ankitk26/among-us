import { useRouter } from "next/router";
import Link from "next/link";

interface IProps {
  children: any;
  path: string;
  text: string;
}

export default function SideBarItem({ children, path, text }: IProps) {
  const router = useRouter();

  const baseClasses = "flex p-2 pl-4 border-l-8 font-medium items-center gap-2";
  const highlightedClasses = "bg-primary-light text-primary border-primary";
  const defaultClasses = "text-gray-600 border-background ";

  return (
    <div
      className={`${baseClasses} ${
        router.asPath === path ? highlightedClasses : defaultClasses
      }`}
    >
      {children}
      <Link href={path}>
        <a>
          <span>{text}</span>
        </a>
      </Link>
    </div>
  );
}

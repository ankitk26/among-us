import { useAuth } from "@/context/AuthContext";
import useOnlyTitle from "@/hooks/useOnlyTitle";
import Link from "next/link";
import HeaderLinks from "./HeaderLinks";
import HeaderProfile from "./HeaderProfile";
import SearchInput from "./SearchInput";
import Image from "next/image";

export default function Header() {
  const onlyTitle = useOnlyTitle();
  const { user, authLoading } = useAuth();

  return (
    <nav className="py-4 bg-white drop-shadow-lg">
      <div className="w-[85%] mx-auto flex items-center justify-between">
        {/* Logo and title */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <Image
              src="/among-us.png"
              alt="logo"
              width={40}
              height={40}
              objectFit="contain"
            />
            <h2 className="text-lg font-semibold">
              Among-<span className="text-primary">us</span>
            </h2>
          </a>
        </Link>

        {!onlyTitle && (
          <>
            <SearchInput />
            <div className="z-50 flex items-center gap-4">
              {authLoading ? null : user ? <HeaderProfile /> : <HeaderLinks />}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

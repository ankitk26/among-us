import { useRouter } from "next/router";

export default function useOnlyTitle() {
  const router = useRouter();
  const paths = ["/login", "/register", "/forgot-password", "/change-password"];
  const toInclude = paths.includes(router.pathname);

  return toInclude;
}

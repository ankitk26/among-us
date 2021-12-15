import Link from "next/link";

export default function HeaderLinks() {
  return (
    <>
      <Link href="/login">
        <a className="px-4 py-1 text-sm text-primary hover:text-primary-dark">
          Login
        </a>
      </Link>
      <Link href="/register">
        <a className="px-4 py-1 text-sm text-white rounded bg-primary hover:bg-primary-dark">
          Register
        </a>
      </Link>
    </>
  );
}

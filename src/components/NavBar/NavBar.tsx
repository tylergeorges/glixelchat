import Link from "next/link";

export function NavBar() {
  return (
    <nav className="fixed top-0 flex h-20 w-full items-center justify-end">
      <Link href={"/login"} className="clickable mr-5 text-lg">
        login
      </Link>
      <Link href={"/register"} className="clickable mr-5 text-lg">
        register
      </Link>
    </nav>
  );
}

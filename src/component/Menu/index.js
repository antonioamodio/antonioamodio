"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Menu() {
  const pathname = usePathname();

  return (
    <section className="menu">
      <Link href={'#'}>About</Link>
      
      {/* Conditionally render "Home" or "Archive" */}
      {pathname === '/archive' ? (
        <Link href={'/'}>Home</Link>
      ) : (
        <Link href={'/archive'}>Archive</Link>
      )}

      {/* Conditionally render "Home" or "Sound" */}
      {pathname === '/sound' ? (
        <Link href={'/'}>Home</Link>
      ) : (
        <Link href={'#'}>Sound</Link>
      )}

      <Link href={'#'}>Contact</Link>
    </section>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Menu() {
  const pathname = usePathname();

  return (
    <section className="menu">

      <div/>
      <div/>
      <div className="link">
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
      </div>
    </section>
  );
}

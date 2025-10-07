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
        <Link href={'#about'}>About</Link>
        
        {pathname === '/archive' ? (
          <Link href={'/'}>Home</Link>
        ) : (
          <Link href={'/archive'}>Archive</Link>
        )}

        {pathname === '/sound' ? (
          <Link href={'/'}>Home</Link>
        ) : (
          <Link href={'/sound'}>Sound</Link>
        )}

        {pathname === '/contact' ? (
          <Link href={'/'}>Home</Link>
        ) : (
          <Link href={'/contact'}>Contact</Link>
        )}
      </div>
    </section>
  );
}

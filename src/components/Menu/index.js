"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Menu() {
  const pathname = usePathname();

  const renderLink = (href, label) => (
    <Link key={href} href={href}>
      {label}
    </Link>
  );

  return (
    <section className="menu">
      <div />
      <div />
      <div className="link">
        {pathname === '/about'
          ? renderLink('/', 'Home')
          : renderLink('/about', 'About')}

        {pathname === '/archive'
          ? renderLink('/', 'Home')
          : renderLink('/archive', 'Archive')}

        {pathname === '/sound'
          ? renderLink('/', 'Home')
          : renderLink('/sound', 'Sound')}

        {pathname === '/contact'
          ? renderLink('/', 'Home')
          : renderLink('/contact', 'Contact')}
      </div>
    </section>
  );
}

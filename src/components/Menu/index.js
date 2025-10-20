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

  const renderHashLink = (href, label) => {
    return (
      <a key={href} href={href}>
        {label}
      </a>
    );
  };

  return (
    <section className="menu">
      <div />
      <div />
      <div className="link">
        {renderHashLink('#about', 'About')}

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

import Link from 'next/link';
import Table from "../../components/Table";
import Logo from '../../../public/archive.svg';
import archiveItems from '../../data/archive';

export default function Archive() {
  return (
    <section className="archive">
      <div className="blur"></div>

      <div className="main-contnet">
        <div className="archive-menu">
          <Link href="/archive">archive</Link>
          <Link href="/">home</Link>
          <Link href="/contact">contact</Link>
        </div>

        <div className="title-archive">
          <Logo className="logo" aria-label="Brand logo" />
        </div>
      </div>

      <div>
        <Table data={archiveItems} />
      </div>
    </section>
  );
}

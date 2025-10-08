import Table from "../../components/Table";
import Logo from '../../../public/archive.svg';
import Link from 'next/link';
import Image from "next/image";

export default function Archive() {
    const jsonData = [
        {
          project: 'G63',
          description: [
            "Concept e direzione artistica del title design.",
            "Compositing e animazione 3D per la sequenza di apertura."
          ],
          year:'2024',
          tag:'GRAPHICS',
          client:'Sfera Ebbasta',
          link:'www.youtube.it',
          cover:'./sfera/cover.png',
          content:['/sfera/cover.png', '/kowi.mp4']
        },
        {
            project: "VIEZE ASBAK",
            description: [
              "Concept e direzione artistica del title design.",
              "Compositing e animazione 3D per la sequenza di apertura."
            ],
            year:'2023',
            tag:'GRAPHICS',
            client:'Vieze Asbak',
            link:'www.youtube.it',
            cover:'./vieze/cover.png',
            content:['/sfera/cover.png', '/kowi.mp4']
        },
        {
            project: "RIOT PARTY S9",
            description: [
              "Concept e direzione artistica del title design.",
              "Compositing e animazione 3D per la sequenza di apertura."
            ],
            year:'2023',
            tag:'GRAPHICS',
            client:'RIOT PARTY',
            link:'www.youtube.it',
            cover:'./riot/cover.png',
            content:['/sfera/cover.png', '/kowi.mp4']
        },
        {
            project: "TECHNOFARM S1",
            description: [
              "Concept e direzione artistica del title design.",
              "Compositing e animazione 3D per la sequenza di apertura."
            ],
            year:'2023',
            tag:'GRAPHICS',
            client:'RIOT PARTY',
            link:'www.youtube.it',
            cover:'./technofarm/cover.png',
            content:['/sfera/cover.png', '/kowi.mp4']
        },
        {
            project: 'G63',
            description: [
              "Concept e direzione artistica del title design.",
              "Compositing e animazione 3D per la sequenza di apertura."
            ],
            year:'2024',
            tag:'GRAPHICS',
            client:'Sfera Ebbasta',
            link:'www.youtube.it',
            cover:'./sfera/cover.png',
            content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "VIEZE ASBAK",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'Vieze Asbak',
              link:'www.youtube.it',
              cover:'./vieze/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "RIOT PARTY S9",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'RIOT PARTY',
              link:'www.youtube.it',
              cover:'./riot/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "TECHNOFARM S1",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'RIOT PARTY',
              link:'www.youtube.it',
              cover:'./technofarm/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
            project: 'G63',
            description: [
              "Concept e direzione artistica del title design.",
              "Compositing e animazione 3D per la sequenza di apertura."
            ],
            year:'2024',
            tag:'GRAPHICS',
            client:'Sfera Ebbasta',
            link:'www.youtube.it',
            cover:'./sfera/cover.png',
            content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "VIEZE ASBAK",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'Vieze Asbak',
              link:'www.youtube.it',
              cover:'./vieze/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "RIOT PARTY S9",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'RIOT PARTY',
              link:'www.youtube.it',
              cover:'./riot/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "TECHNOFARM S1",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'RIOT PARTY',
              link:'www.youtube.it',
              cover:'./technofarm/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
            project: 'G63',
            description: [
              "Concept e direzione artistica del title design.",
              "Compositing e animazione 3D per la sequenza di apertura."
            ],
            year:'2024',
            tag:'GRAPHICS',
            client:'Sfera Ebbasta',
            link:'www.youtube.it',
            cover:'./sfera/cover.png',
            content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "VIEZE ASBAK",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'Vieze Asbak',
              link:'www.youtube.it',
              cover:'./vieze/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "RIOT PARTY S9",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'RIOT PARTY',
              link:'www.youtube.it',
              cover:'./riot/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: "TECHNOFARM S1",
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2023',
              tag:'GRAPHICS',
              client:'RIOT PARTY',
              link:'www.youtube.it',
              cover:'./technofarm/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
          },
          {
              project: 'G63',
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2024',
              tag:'GRAPHICS',
              client:'Sfera Ebbasta',
              link:'www.youtube.it',
              cover:'./sfera/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
            },
            {
                project: "VIEZE ASBAK",
                description: [
                  "Concept e direzione artistica del title design.",
                  "Compositing e animazione 3D per la sequenza di apertura."
                ],
                year:'2023',
                tag:'GRAPHICS',
                client:'Vieze Asbak',
                link:'www.youtube.it',
                cover:'./vieze/cover.png',
                content:['/sfera/cover.png', '/kowi.mp4']
            },
            {
                project: "RIOT PARTY S9",
                description: [
                  "Concept e direzione artistica del title design.",
                  "Compositing e animazione 3D per la sequenza di apertura."
                ],
                year:'2023',
                tag:'GRAPHICS',
                client:'RIOT PARTY',
                link:'www.youtube.it',
                cover:'./riot/cover.png',
                content:['/sfera/cover.png', '/kowi.mp4']
            },
            {
                project: "TECHNOFARM S1",
                description: [
                  "Concept e direzione artistica del title design.",
                  "Compositing e animazione 3D per la sequenza di apertura."
                ],
                year:'2023',
                tag:'GRAPHICS',
                client:'RIOT PARTY',
                link:'www.youtube.it',
                cover:'./technofarm/cover.png',
                content:['/sfera/cover.png', '/kowi.mp4']
            },
            {
              project: 'G63',
              description: [
                "Concept e direzione artistica del title design.",
                "Compositing e animazione 3D per la sequenza di apertura."
              ],
              year:'2024',
              tag:'GRAPHICS',
              client:'Sfera Ebbasta',
              link:'www.youtube.it',
              cover:'./sfera/cover.png',
              content:['/sfera/cover.png', '/kowi.mp4']
            },
            {
                project: "VIEZE ASBAK",
                description: [
                  "Concept e direzione artistica del title design.",
                  "Compositing e animazione 3D per la sequenza di apertura."
                ],
                year:'2023',
                tag:'GRAPHICS',
                client:'Vieze Asbak',
                link:'www.youtube.it',
                cover:'./vieze/cover.png',
                content:['/sfera/cover.png', '/kowi.mp4']
            },
            {
                project: "RIOT PARTY S9",
                description: [
                  "Concept e direzione artistica del title design.",
                  "Compositing e animazione 3D per la sequenza di apertura."
                ],
                year:'2023',
                tag:'GRAPHICS',
                client:'RIOT PARTY',
                link:'www.youtube.it',
                cover:'./riot/cover.png',
                content:['/sfera/cover.png', '/kowi.mp4']
            },
            {
                project: "TECHNOFARM S1",
                description: [
                  "Concept e direzione artistica del title design.",
                  "Compositing e animazione 3D per la sequenza di apertura."
                ],
                year:'2023',
                tag:'GRAPHICS',
                client:'RIOT PARTY',
                link:'www.youtube.it',
                cover:'./technofarm/cover.png',
                content:['/sfera/cover.png', '/kowi.mp4']
            },
      ];
  return (
    <section className="archive">
    <div className="blur"></div>


    <div className="main-contnet">

        <div className="archive-menu">
        <Link href="/archive">archive</Link>
        <Link href="/">home</Link>
        <Link href="/archive">archive</Link>

        </div>

        <div className="title-archive">
        <Logo className="logo" aria-label="Brand logo" />
        </div>
        
    </div>

    <div>
        <Table
        data={jsonData}
        />
    </div>

    {/* <div className="center">
        <h1>Work In Progress</h1>
    </div> */}
    </section>
  )
}

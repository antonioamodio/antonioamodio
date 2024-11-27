import Menu from "@/component/Menu";
import RenderEnv from "@/component/RenderEnv";
import Table from "@/component/Table";
import Image from "next/image";

export default function Archive() {
    const jsonData = [
        {
          project: 'G63 Title Design',
          year:'2024',
          client:'Sfera Ebbasta',
          cover:'./sfera/cover.png',
          content:['./image.png', './video.mp4']
        },
        {
            project: "Logo 'VIEZE ASBAK'",
            year:'2023',
            client:'Vieze Asbak',
            cover:'./vieze/cover.png',
            content:['./image.png', './video.mp4']
        },
        {
            project: "Brand Id - RIOT PARTY S9",
            year:'2023',
            client:'Riot Party',
            cover:'./riot/cover.png',
            content:['./image.png', './video.mp4']
        },
        {
            project: "Brand Id - RIOT PARTY S8",
            year:'2022',
            client:'Riot Party',
            cover:'./riot/cover.png',
            content:['./image.png', './video.mp4']
        },
        {
            project: "Web Design - TECHNOFARM S1",
            year:'2023',
            client:'Technofarm',
            cover:'./technofarm/cover.png',
            content:['./image.png', './video.mp4']
        },
        {
            project: "Brand Id - Slide",
            year:'2023',
            client:'Slide',
            cover:'./slide/cover.png',
            content:['./image.png', './video.mp4']
        },
        {
        project: 'Brand Id - ORA',
        year:'2024',
        client:'ORA',
        cover:'./ora/cover.png',
        content:['./image.png', './video.mp4']
        },
        {
            project: "Visual Show Ledwall 'KID YUGI'",
            year:'2023',
            client:'Kid Yugi',
            cover:'./kid-yugi/cover.png',
            content:['./image.png', './video.mp4']
        }
      ];
  return (
    <section className="archive">
    {/* <div className="blur"></div>
    <div className="top">
        <h1 className="secondary">ARCHIVE</h1>
    </div>
    <div className="down">
        <Table
        data={jsonData}
        />
    </div> */}
    <div className="center">
        <h1>Work In Progress</h1>
    </div>
    </section>
  )
}

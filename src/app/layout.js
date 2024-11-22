import { Inter } from "next/font/google";
import { motion } from 'framer-motion';
import "../scss/app.scss";
import Menu from "@/component/Menu";
import RenderEnv from "@/component/RenderEnv";
import SwupWrapper from "@/component/SwupWrapper";
import BackGround from "@/component/BackGround";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ANTONIO AMODIO",
  description: "The arts made by kowi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="layout">
        <BackGround/>
        <Menu/>
            {/* <RenderEnv/> */}
              <SwupWrapper>
                {children}
              </SwupWrapper>
        </div>
        </body>
    </html>
  );
}

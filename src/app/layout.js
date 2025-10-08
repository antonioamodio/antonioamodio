import { Inter } from "next/font/google";
import { motion } from 'framer-motion';
import "../scss/app.scss";
import SwupWrapper from "../components/SwupWrapper";
import BackGround from "../components/BackGround";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ANTONIO AMODIO",
  description: "The arts made by kowi",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="layout">
        <BackGround/>
                {children}
        </div>
        </body>
    </html>
  );
}


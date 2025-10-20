import { Inter } from "next/font/google";
import "../scss/app.scss";
import BackGround from "../components/BackGround";
import TransitionLayout from "../components/TransitionLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ANTONIO AMODIO",
  description: "The arts made by kowi",
  // opzionale, utile per PWA full-screen su iOS:
  appleWebApp: { capable: true, statusBarStyle: "black-translucent" },
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
        {/* Background fisso: fuori da wrapper che potrebbero avere transform/filter */}
        <BackGround />
        <div className="layout">
          <TransitionLayout>{children}</TransitionLayout>
        </div>
      </body>
    </html>
  );
}

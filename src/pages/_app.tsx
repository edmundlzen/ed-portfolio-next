import { type AppType } from "next/dist/shared/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { Fraunces, Sora } from "next/font/google";

import "~/styles/globals.css";

const mono = localFont({
  src: "../../public/fonts/Cascadia/CascadiaCode.ttf",
  variable: "--font-mono",
  weight: "200 700",
  display: "swap",
});

const serif = Fraunces({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div
      className={`${mono.variable} ${serif.variable} ${sans.variable} font-sans`}
    >
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
};

export default MyApp;

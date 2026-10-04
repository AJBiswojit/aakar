import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://aakar.form"),
  title: "AAKAR — Form, Crafted Digitally. 3D Atelier & Store",
  description:
    "AAKAR is an independent 3D studio and digital atelier building characters, creatures, objects and worlds — premium 3D assets for artists, games and film.",
  openGraph: {
    title: "AAKAR — Form, Crafted Digitally.",
    description:
      "An independent 3D studio creating characters, creatures, objects and digital worlds with precision and intent.",
    images: ["/assets/hero-form.jpg"],
  },
};

export const viewport = {
  themeColor: "#050608",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

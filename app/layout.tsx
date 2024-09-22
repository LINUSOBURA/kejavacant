import type { Metadata } from "next";
import Header from "../components/Header";
import { Poppins } from "next/font/google";
import Footer from "../components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "KejaVacant",
  description: "Get a high quality vacanct house for your next stay!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-screen max-w-full overflow-x-hidden flex flex-col`}
      >
        <Header />
        <div className="mb-auto flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}

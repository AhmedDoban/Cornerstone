import type { Metadata } from "next";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "@/Style/Normalize.css";
import "@/Style/Root.css";
import "@/Style/Style.css";

export const metadata: Metadata = {
  title: "Cornerstone",
  description: "contact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

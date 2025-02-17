import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Bookstore",
  description: "책을 등록하고 공유해요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

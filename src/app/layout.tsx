import "./globals.css";

import type { Metadata } from "next";

import Providers from "./provider";

export const metadata: Metadata = {
  title: "Online Bookstore",
  description: "책을 등록하고 공유해요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

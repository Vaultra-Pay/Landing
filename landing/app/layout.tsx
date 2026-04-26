import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaultra — Where Fiat Meets Crypto",
  description:
    "Receive crypto. Convert instantly. Spend like cash. One app. Zero friction. Vaultra Pay — the vault that works for you.",
  keywords: [
    "Vaultra",
    "Vaultra Pay",
    "crypto wallet",
    "naira",
    "non-custodial wallet",
    "crypto to fiat",
    "Nigeria fintech",
    "USDT Nigeria",
  ],
  authors: [{ name: "Vaultra Finance" }],
  openGraph: {
    title: "Vaultra — Where Fiat Meets Crypto",
    description:
      "Receive crypto. Convert instantly. Spend like cash. One app. Zero friction.",
    type: "website",
    siteName: "Vaultra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaultra — Where Fiat Meets Crypto",
    description:
      "Receive crypto. Convert instantly. Spend like cash. One app. Zero friction.",
    site: "@VaultraPayNG",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-brand-black text-white antialiased">{children}</body>
    </html>
  );
}

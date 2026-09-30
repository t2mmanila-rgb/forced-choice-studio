import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YesPlan | Forced Choice Studio",
  description:
    "Interactive date & invite funnels where rejection is hilariously impossible.",
  openGraph: {
    title: "YesPlan | Forced Choice Studio",
    description:
      "Interactive funnels where rejection is hilariously impossible.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

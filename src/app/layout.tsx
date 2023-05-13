import { League_Spartan } from "next/font/google";

const ls = League_Spartan({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Tom Shaw",
    default: "Blog | Tom Shaw",
  },
  description: "Blog",
  icons: "/favicon.ico",
  openGraph: {
    type: "website",
    url: "https://blog.tmsh.dev",
    images: [
      {
        url: "https://tmsh.dev/og.jpg",
        width: 1300,
        height: 630,
        alt: "Tom Shaw",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ls.className}>
      <body className="max-w-2xl h-full mx-auto px-6 my-8 bg-hero bg-black text-white">
        <main className="flex flex-col h-full">{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nome do Seu Blog",
  description: "Blog criado com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if((s||(p?'dark':'light'))==='dark')document.documentElement.setAttribute('data-theme','dark');})();` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

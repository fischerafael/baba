import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baba App",
  description: "Gestão simples de famílias e babás"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

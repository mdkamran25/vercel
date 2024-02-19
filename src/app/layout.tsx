import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/authProvider";
import GameContextProvider from "@/context/gameContext";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe game developed using next.js + typescript",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="profileModal" />
        <div id="resultModal" />
        <AuthProvider session={session}>
          <GameContextProvider>{children}</GameContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/src/components/QueryProvider/QueryProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-do List",
  description: "To-do list created with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <QueryProvider>  {/* Usando o QueryProvider aqui */}
          <div className="bg-gradient-to-r from-[#352432] to-[#241722] h-full p-[10%] pt-16 lg:pt-1">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}

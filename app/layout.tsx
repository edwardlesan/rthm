import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "RTHM",
  description: "Creat de studentul: Sendrea-Lesan Eduardo",
  icons: "/home-icon.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

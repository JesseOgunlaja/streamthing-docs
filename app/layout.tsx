import Favicon from "@/components/Favicon";
import SideNavbar from "@/components/navbar/SideNavbar";
import TopNavbar from "@/components/navbar/TopNavbar";
import StateProvider from "@/components/StateProvider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Streamthing Docs",
  description: "Documentation for the Streamthing service",
  metadataBase: new URL("https://docs.streamthing.dev"),
  keywords: ["Streamthing Docs", "Streamthing Documentation", "Jesse Ogunlaja"],
  authors: [
    {
      name: "Jesse Ogunlaja",
    },
  ],
  creator: "Jesse Ogunlaja",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeCookie = (await cookies()).get("theme")?.value || "";
  const theme = themeCookie === "light" ? "light" : "dark";

  return (
    <html lang="en">
      <body className={`${poppins.className} ${theme}-theme`}>
        <Analytics />
        <StateProvider theme={theme}>
          <TopNavbar />
          <SideNavbar />
          <Favicon />
          {children}
        </StateProvider>
      </body>
    </html>
  );
}

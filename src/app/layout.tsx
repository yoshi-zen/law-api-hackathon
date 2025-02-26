import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { TopBar } from "@/components/frames/top-bar";
import {} from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
// import { BreadCrumb } from "@/components/breadcrumbs";
import { twMerge } from "tailwind-merge";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "法律情報検索・編集システム",
  description: "法令APIハッカソン 2025 created by apiuris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          "antialiased font-noto-sans-jp h-[100dvh] max-h-[100dvh]",
          notoSansJp.variable,
        )}
      >
        <SidebarProvider>
          <AppSidebar />
          <div className="grid h-screen w-full grid-rows-[2.5em_1fr] gap-2 p-2">
            <TopBar />
            {/* <Tabs className="row-span-2 grid grid-rows-[2.5em_1fr] gap-2">
              <TabsList className="justify-start rounded-md bg-gray-200 p-1">
                <TabsTrigger value="history">改変履歴</TabsTrigger>
                <TabsTrigger value="auxiliary">AI補助</TabsTrigger>
              </TabsList>
              <TabsContent
                value="history"
                className="mt-0 h-full rounded-md bg-gray-200"
              >
                <TabContentDesign />
              </TabsContent>
              <TabsContent
                value="auxiliary"
                className="mt-0 h-full rounded-md"
              >
                Change your password here.
              </TabsContent>
            </Tabs> */}
            <div className="flex-col overflow-y-scroll rounded-md bg-gray-100">
              {children}
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}

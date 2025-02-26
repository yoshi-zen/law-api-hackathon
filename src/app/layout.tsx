import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import TabContentDesign from "@/components/page/tab-content-design";

import { AppSidebar } from "@/components/page/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { BreadCrumb } from "@/components/breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { twMerge } from "tailwind-merge";
import TabContentChat from "@/components/page/tab-content-chat";
import { FileClock, Sparkles } from "lucide-react";
import { SettingsDialog } from "@/components/page/settings-dialog";
import { ApiKeyProvider } from "@/contexts/api-key-context";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <ApiKeyProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="grid h-screen grid-cols-[5fr_4fr] gap-4">
              <div className="grid h-screen grid-cols-[1fr_4fr] gap-4 p-4 pr-0">
                <div className="grid grid-rows-[2.5rem_1fr] gap-4">
                  <div className="rounded-md bg-slate-400" />
                  <div className="rounded-md bg-slate-600" />
                </div>
                <div className="grid grid-rows-[2.5rem_1fr] gap-4">
                  <div className="flex items-center rounded-md bg-slate-200 px-4">
                    <BreadCrumb />
                  </div>
                  <div className="max-h-[calc(100vh-5.5rem)] flex-col overflow-y-scroll rounded-md bg-slate-400">
                    {children}
                  </div>
                </div>
              </div>
              <div className="rounded-md p-4 pl-0">
                <Tabs
                  defaultValue="history"
                  className="w-full h-full"
                >
                  <div className="flex items-center justify-between">
                    <TabsList>
                      <TabsTrigger value="history">
                        <div className="flex gap-2">
                          <div className=""><FileClock /></div>
                          <div>改変履歴</div>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="auxiliary">
                        <div className="flex gap-2">
                          <div className="text-sm"><Sparkles /></div>
                          <div>AI補助</div>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                    <SettingsDialog />
                  </div>
                  <TabsContent value="history">
                    <TabContentDesign />
                  </TabsContent>
                  <TabsContent value="auxiliary">
                    <TabContentChat />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </SidebarProvider>
        </ApiKeyProvider>
      </body>
    </html>
  );
}

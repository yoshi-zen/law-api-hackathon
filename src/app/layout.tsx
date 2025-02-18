import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import TabContentDesign from "@/components/page/tab-content-design";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slash } from "lucide-react";
import { twMerge } from "tailwind-merge";

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
        <div className="grid h-screen grid-cols-[5fr_4fr] gap-4">
          <div className="grid h-screen grid-cols-[1fr_4fr] gap-4 p-4 pr-0">
            <div className="grid grid-rows-[2.5rem_1fr] gap-4">
              <div className="rounded-md bg-slate-400" />
              <div className="rounded-md bg-slate-400" />
            </div>
            <div className="grid grid-rows-[2.5rem_1fr] gap-4">
              <div className="flex items-center rounded-md bg-slate-200 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <Slash />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/components">
                        Components
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="h-full max-h-full overflow-y-auto rounded-md bg-gray-100">
                {children}
              </div>
            </div>
          </div>
          <div className="rounded-md p-4 pl-0">
            <Tabs
              defaultValue="history"
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="history">改変履歴</TabsTrigger>
                <TabsTrigger value="auxiliary">AI補助</TabsTrigger>
              </TabsList>
              <TabsContent value="history">
                <TabContentDesign />
              </TabsContent>
              <TabsContent value="auxiliary">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </body>
    </html>
  );
}

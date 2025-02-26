// pages/index.tsx

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
   return (
      <div className="h-[calc(100vh-5.5rem)] bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8 rounded-md">
         <h1 className="text-2xl font-bold mb-8">法令サービス</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <Card className="shadow-lg border h-full">
               <CardHeader className="text-xl w-full flex items-center font-semibold">
                  <CardTitle className="text-xl">
                     法令作成補助GPT
                  </CardTitle>
               </CardHeader>
               <CardContent className="flex flex-col justify-between h-[calc(100%-3rem)]">
                  <p className="mb-4 text-gray-700">
                     最新の法令作成支援ツールで、効率的かつ正確な法令作成をサポートします。
                  </p>
                  <Button className="w-full mt-auto">
                     <Link
                        target="_blank"
                        href="https://chatgpt.com/g/g-67a5c6a9909481918951404b3e28e875-fa-api-quan-ti"
                        className="flex items-center justify-center gap-2 w-full"
                     >
                        開始する <ExternalLink />
                     </Link>
                  </Button>
               </CardContent>
            </Card>

            <Card className="shadow-lg border h-full">
               <CardHeader className="text-xl w-full flex items-center font-semibold">
                  <CardTitle className="text-xl">
                     法令関係性GPT
                  </CardTitle>
               </CardHeader>
               <CardContent className="flex flex-col justify-between h-[calc(100%-3rem)]">
                  <p className="mb-4 text-gray-700">
                     法令同士の関連性を解析し、深い洞察を提供するツールです。
                  </p>
                  <Button className="w-full mt-auto">
                     <Link
                        target="_blank"
                        href="https://chatgpt.com/g/g-67adad0b738c8191959146d832c5598f-fa-ling-guan-xi-xing-gpt"
                        className="flex items-center justify-center gap-2 w-full"
                     >
                        開始する <ExternalLink />
                     </Link>
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

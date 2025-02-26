// pages/index.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
   return (
      <div className="flex h-[calc(100vh-9.5rem)] flex-col items-center justify-center rounded-md bg-gradient-to-r from-blue-50 to-purple-50 p-8">
         <h1 className="mb-8 text-2xl font-bold">法令サービス</h1>
         <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="h-full border shadow-lg">
               <CardHeader className="flex w-full items-center text-xl font-semibold">
                  <CardTitle className="text-xl">
                     法令作成補助GPT
                  </CardTitle>
               </CardHeader>
               <CardContent className="flex h-[calc(100%-3rem)] flex-col justify-between">
                  <p className="mb-4 text-gray-700">
                     知識をもとにxml形式で法律を作成するGPTsです。
                  </p>
                  <Button className="mt-auto w-full">
                     <Link
                        target="_blank"
                        href="https://chatgpt.com/g/g-67a5c6a9909481918951404b3e28e875-fa-api-quan-ti"
                        className="flex w-full items-center justify-center gap-2"
                     >
                        開始する <ExternalLink />
                     </Link>
                  </Button>
               </CardContent>
            </Card>

            <Card className="h-full border shadow-lg">
               <CardHeader className="flex w-full items-center text-xl font-semibold">
                  <CardTitle className="text-xl">
                     法令関係性GPT
                  </CardTitle>
               </CardHeader>
               <CardContent className="flex h-[calc(100%-3rem)] flex-col justify-between">
                  <p className="mb-4 text-gray-700">
                     作成した法令と現在の法令の関連性を確認するGPTsです。
                  </p>
                  <Button className="mt-auto w-full">
                     <Link
                        target="_blank"
                        href="https://chatgpt.com/g/g-67adad0b738c8191959146d832c5598f-fa-ling-guan-xi-xing-gpt"
                        className="flex w-full items-center justify-center gap-2"
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

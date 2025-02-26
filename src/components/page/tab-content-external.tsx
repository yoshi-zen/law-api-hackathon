// pages/index.tsx

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TabContentExternal() {

   return (
      <div className="container mx-auto flex flex-col gap-4 items-center justify-center pb-4 h-[calc(100vh-14rem)]">
         <h1 className="mt-12">法令作成補助GPT</h1>
         <Button >

            <Link target="_blank" href="https://chatgpt.com/g/g-67a5c6a9909481918951404b3e28e875-fa-api-quan-ti" className="flex items-center gap-2">
               法令作成補助GPT<ExternalLink />
            </Link>
         </Button>
      </div>
   );
}

"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type Props = {
  type: string
}

export function ChatInfromationsDialog({
  type
}: Props) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Info />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>モデル説明</DialogTitle>
          <DialogDescription>
            このモデルは{type === "Auxiliary" ? "生成補助" : "関連性"}を行うためのモデルです。
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <div className="">
            <strong>モデルの知識は法令APIを用いていますが、回答は必ずしも正しいとは限りません。重要な情報は確認するようにしてください。            </strong>
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

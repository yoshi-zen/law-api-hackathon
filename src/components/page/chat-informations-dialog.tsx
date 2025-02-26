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
            このモデルは
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <div className="">
            <strong>知識をもとにxml形式で[法令の内容]に対しての法律を作成してください。法令は省略せずに全て記述してください。</strong>
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

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { FC } from "react";
import type { LawsResponseType } from "../../_types/_common/laws-response";

type Props = {
  law: LawsResponseType["laws"][number];
};

export const DialogSelectLaw: FC<Props> = (props: Props) => {
  const { law } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="h-fit w-full py-1 text-xs"
          variant="default"
        >
          この法律を選択
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>この法律を編集しますか？</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>法律名：{law.current_revision_info.law_title}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction>選択する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

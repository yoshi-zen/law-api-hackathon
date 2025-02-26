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
import { toast } from "@/hooks/use-toast";
import { specificLawAtom } from "@/jotai/atoms";
import { useSetAtom } from "jotai";
import type { FC } from "react";
import { fetchSpecificLaw } from "../../_actions/fetch-specific-law";
import type { LawsResponseType } from "../../_types/_common/laws-response";

type Props = {
  law: LawsResponseType["laws"][number];
};

export const DialogSelectLaw: FC<Props> = (props: Props) => {
  const { law } = props;

  const setSpecificLaw = useSetAtom(specificLawAtom);

  const handleAccept = async () => {
    const specificLaw = await fetchSpecificLaw(law.law_info.law_id);

    if (specificLaw.status === "success") {
      setSpecificLaw(specificLaw.data);
      toast({
        title: "法律を選択しました",
      });
      return;
    }

    toast({
      title: "法律の取得に失敗しました。",
      description:
        specificLaw.status === "error" && specificLaw.errorInfo.message,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          className="h-fit w-full py-1 text-xs"
          variant="default"
          disabled={law.current_revision_info.repeal_status !== "None"}
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
          <AlertDialogAction onClick={handleAccept}>選択する</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

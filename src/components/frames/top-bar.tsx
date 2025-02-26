"use client";

import { specificLawAtom } from "@/jotai/atoms";
import { useSetAtom } from "jotai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {} from "../ui/dialog";
import { SidebarTrigger } from "../ui/sidebar";

export const TopBar = () => {
  const setSelectedLaw = useSetAtom(specificLawAtom);

  return (
    <div className="relative flex items-center rounded-md">
      <SidebarTrigger className="m-0" />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            className="absolute right-0 self-end"
          >
            別の法律を選択
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>法律の変更</AlertDialogTitle>
          <p>選択中の法律を変更しますか？</p>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                type="button"
                variant="outline"
              >
                キャンセル
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                type="button"
                onClick={() => setSelectedLaw(undefined)}
              >
                はい
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

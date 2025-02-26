"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useApiKey } from "@/contexts/api-key-context";

export function SettingsDialog() {
    const { apiKey, setApiKey } = useApiKey();

    const handleSave = () => {
        // 必要に応じて保存時の追加処理をここに記述
        console.log("API key saved:", apiKey);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>API キー設定</DialogTitle>
                    <DialogDescription>
                        有効な API キーを入力してください。入力したキーを用いて回答を取得します。
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="API キーを入力"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>保存</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 
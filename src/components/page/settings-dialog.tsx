"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useApiKey } from "@/contexts/api-key-context";
import { useState } from "react";

// APIキーが長い場合、先頭と末尾を表示して中間を"..."で省略するヘルパー関数
function truncateApiKey(key: string, maxLength: number = 20): string {
    if (key.length <= maxLength) return key;
    const start = key.slice(0, 8);
    const end = key.slice(-8);
    return `${start}...${end}`;
}

export function SettingsDialog() {
    const { apiKeys, addApiKey, removeApiKey } = useApiKey();
    const [newApiKey, setNewApiKey] = useState("");

    const handleSave = () => {
        if (newApiKey) {
            addApiKey(newApiKey);
            setNewApiKey(""); // 入力フィールドをクリア
        }
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
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                    />
                </div>
                <div className="mt-4 overflow-x-auto">
                    <strong>現在のAPIキー:</strong>
                    <table className="min-w-full divide-y divide-gray-200 mt-2">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    API Key
                                </th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {apiKeys.map((key: string) => (
                                <tr key={key}>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <span className="block truncate" title={key}>
                                            {truncateApiKey(key)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap">
                                        <Button
                                            type="button"
                                            onClick={() => removeApiKey(key)}
                                            variant="destructive"
                                        >
                                            削除
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

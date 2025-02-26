"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useApiKey } from "@/contexts/api-key-context";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    const [selectedModel, setSelectedModel] = useState("Auxiliary");

    const handleSave = () => {
        if (newApiKey) {
            // addApiKey に 1 つのオブジェクトを渡す
            addApiKey({ key: newApiKey, model: selectedModel });
            setNewApiKey("");
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
                <div className="mt-4">
                    <strong>モデルの選択:</strong>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="モデルを選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Auxiliary">Auxiliary</SelectItem>
                            <SelectItem value="Relevance">Relevance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-4">
                    <strong>現在のAPIキー:</strong>
                    <ul>
                        {apiKeys.map(({ key, model }) => (
                            <li key={key} className="flex justify-between items-center">
                                <span title={key} className="block truncate">
                                    ・{model === "Auxiliary" ? "生成補助" : "関連性"}：
                                </span>
                                <span title={key} className="block truncate">
                                    {truncateApiKey(key)}
                                </span>
                                <Button
                                    type="button"
                                    onClick={() => removeApiKey(key)}
                                    variant="destructive"
                                    className="ml-4"
                                >
                                    削除
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>保存</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

"use client"

import { Button } from "@/components/ui/button";
// shadcn/ui コンポーネントのインポート例（パスはプロジェクトに合わせて調整）
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useApiKey } from "@/contexts/api-key-context";
import { useEffect, useRef, useState } from "react";
import { ChatInfromationsDialog } from "./chat-informations-dialog";

interface Message {
    role: "user" | "assistant";
    content: string;
    error?: boolean;
}

export default function TabContentChat() {
    // apiKeys を取得し、先頭のキーを currentApiKey として使用
    const { apiKeys } = useApiKey();
    const currentApiKey = apiKeys.length > 0 ? apiKeys[0].key : "";
    const [input, setInput] = useState("");
    const [chat, setChat] = useState<Message[]>([]);
    const [model, setModel] = useState("Auxiliary");
    const bottomRef = useRef<HTMLDivElement>(null);

    // チャット更新時に自動スクロール
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    // メッセージ送信処理
    const sendMessage = async () => {
        if (!input.trim()) return;
        const updatedChat = [...chat, { role: "user" as const, content: input }];
        setChat(updatedChat);
        setInput("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedChat, model, apiKey: currentApiKey }),
            });
            const data = await response.json();
            if (data.result) {
                setChat([...updatedChat, data.result]);
            } else {
                console.error("エラー:", data.error);
                setChat([...updatedChat, { role: "assistant", content: `エラー: ${data.error}`, error: true }]);
            }
        } catch (error) {
            console.error("エラー:", error);
            setChat([...updatedChat, { role: "assistant", content: "エラーが発生しました", error: true }]);
        }
    };

    // フォーム送信時の処理
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage();
    };

    // Textarea の onKeyDown イベントで Enter キーを検出（IME の予測変換中は送信しない）
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await sendMessage();
        }
    };

    return (
        <div className="container mx-auto h-[calc(100vh-19.5rem)] p-4">
            <Card className="h-full shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between pl-4 text-xl font-bold">
                        <div>{model === "Auxiliary" ? "生成補助" : "関連性"}</div>
                        <ChatInfromationsDialog type={model} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="my-2 h-[calc(100%-5rem)] space-y-2 overflow-y-scroll">
                    {chat.map((message, index) => (
                        <div
                            key={index}
                            className={message.role === "user" ? "flex justify-start" : "flex justify-end"}
                        >
                            <div
                                className={`p-2 rounded max-w-[80%] whitespace-pre-wrap ${message.role === "user"
                                    ? "bg-blue-100"
                                    : message.error
                                        ? "bg-red-100"
                                        : "bg-green-100"
                                    }`}
                            >
                                {/* <strong>
                                    {message.role === "user"
                                        ? "ユーザー"
                                        : message.error
                                        ? "エラー"
                                        : "ChatGPT"}
                                    :
                                </strong>{" "} */}
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {/* チャット最下部のダミー要素 */}
                    <div ref={bottomRef} />
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4 grid grid-cols-2 items-center">
                    <label className="mb-1 block text-xl font-bold">Your Message</label>
                    <Select value={model} onValueChange={setModel}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="モデルを選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Auxiliary">生成補助</SelectItem>
                            <SelectItem value="Relevance">関連性確認</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Textarea
                        className="w-full resize-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="知識をもとにxml形式で[法令内容]に対しての法律を作成してください。法令は省略せずに全て記述してください。"
                        rows={3}
                    />
                    <Button type="submit" className="absolute bottom-2 right-2">
                        送信
                    </Button>
                </div>
            </form>
        </div>
    );
}

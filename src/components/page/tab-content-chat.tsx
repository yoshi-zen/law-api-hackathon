"use client"

import { useState, useEffect, useRef } from "react";
// shadcn/ui コンポーネントのインポート例（パスはプロジェクトに合わせて調整）
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// Dialog (モーダル) コンポーネントのインポート例
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { useApiKey } from "@/contexts/api-key-context";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function TabContentChat() {
    const { apiKey } = useApiKey();
    const [input, setInput] = useState("");
    const [chat, setChat] = useState<Message[]>([]);
    const [model, setModel] = useState("gpt-3.5-turbo");
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

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updatedChat, model, apiKey }),
        });
        const data = await response.json();
        if (data.result) {
            setChat([...updatedChat, data.result]);
        } else {
            console.error("エラー:", data.error);
        }
    };

    // フォーム送信
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage();
    };

    // Enter キーで送信（IME の予測変換中は送信しない）
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            await sendMessage();
        }
    };

    return (
        <div className="container mx-auto p-4 h-[calc(100vh-14.5rem)]">
            <Card className="shadow-md h-full">
                <CardHeader>
                    <CardTitle className="text-xl pl-4 font-bold">
                        <div>{model}</div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-5rem)] my-2 overflow-y-scroll space-y-2">
                    {chat.map((message, index) => (
                        <div
                            key={index}
                            className={message.role === "user" ? "flex justify-start" : "flex justify-end"}
                        >
                            <div
                                className={`p-2 rounded max-w-[80%] whitespace-pre-wrap ${message.role === "user" ? "bg-blue-100" : "bg-green-100"
                                    }`}
                            >
                                <strong>{message.role === "user" ? "ユーザー" : "ChatGPT"}:</strong>{" "}
                                {message.content}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4 grid grid-cols-2 items-center">
                    <label className="block mb-1 font-bold text-xl">Your Message</label>
                    <Select value={model} onValueChange={setModel}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="モデルを選択" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                            <SelectItem value="gpt-4">gpt-4</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Textarea
                        className="w-full resize-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="メッセージを入力..."
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

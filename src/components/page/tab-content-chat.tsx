// pages/index.tsx
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

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function TabContentChat() {
    const [input, setInput] = useState("");
    const [chat, setChat] = useState<Message[]>([]);
    const [model, setModel] = useState("gpt-3.5-turbo");
    const bottomRef = useRef<HTMLDivElement>(null);

    // チャット更新時に自動で最下部へスクロール
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    // メッセージ送信処理を共通化
    const sendMessage = async () => {
        if (!input.trim()) return;

        // ユーザーのメッセージをチャット履歴に追加
        const updatedChat = [...chat, { role: "user" as const, content: input }];
        setChat(updatedChat);
        // 送信後、入力フィールドをクリア
        setInput("");

        // API エンドポイントへリクエスト（選択した model を含む）
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: updatedChat, model }),
        });
        const data = await response.json();
        if (data.result) {
            setChat([...updatedChat, data.result]);
        } else {
            console.error("エラー:", data.error);
        }
    };

    // フォーム送信時の処理
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sendMessage();
    };

    // Textarea の onKeyDown イベントで Enter キーを検出（Shift+Enter で改行）
    // 予測変換中（IME）の Enter は nativeEvent.isComposing が true になるため送信処理をスキップ
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // 改行挿入を防止
            await sendMessage();
        }
    };

    return (
        <div className="container mx-auto pb-4 h-[calc(100vh-14rem)]">
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
                            className={message.role === "assistant" ? "flex justify-start" : "flex justify-end"}
                        >
                            <div
                                className={`p-2 rounded max-w-[80%] whitespace-pre-wrap ${
                                    message.role === "user" ? "bg-blue-100" : "bg-green-100"
                                }`}
                            >
                                {/* <strong>{message.role === "user" ? "ユーザー" : "ChatGPT"}:</strong>{" "} */}
                                {message.content}
                            </div>
                        </div>
                    ))}
                    {/* チャット最下部のダミー要素 */}
                    <div ref={bottomRef} />
                </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="mt-4">
                {/* モデル選択 */}
                <div className="mb-4 grid grid-cols-2 items-center">
                    <label className="block mb-1 ml-2 font-bold text-xl">
                        Your Message
                    </label>
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

                {/* Textarea 入力エリアと送信ボタンを含むコンテナ */}
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

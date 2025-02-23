// pages/index.tsx
"use client"

import { useState } from "react";
// shadcn/ui コンポーネントのインポート例（プロジェクト内のコンポーネントパスに合わせて変更）
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TextareaWithButton } from "./textarea";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function TabContentChat() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // ユーザーのメッセージをチャット履歴に追加
    const updatedChat = [...chat, { role: "user" as const, content: input }];
    setChat(updatedChat);
    setInput("");

    // API エンドポイントにリクエスト 
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedChat }),
    });

    const data = await response.json();
    if (data.result) {
      setChat([...updatedChat, data.result]);
    } else {
      console.error("エラー:", data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">ChatGPT チャット</CardTitle>
        </CardHeader>
        <CardContent className="h-96 overflow-y-auto space-y-2">
          {chat.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                message.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
              }`}
            >
              <strong>{message.role === "user" ? "ユーザー" : "ChatGPT"}:</strong>{" "}
              {message.content}
            </div>
          ))}
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <TextareaWithButton/>
      </form>
    </div>
  );
}

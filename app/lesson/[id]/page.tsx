"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const lessons = [
    { id: 1, title: "Introduction to Python", duration: "10:30", completed: true },
    { id: 2, title: "Variables and Data Types", duration: "15:45", completed: true },
    {
        id: 3,
        title: "Control Flow - If Statements",
        duration: "12:20",
        completed: true,
        current: true,
    },
    { id: 4, title: "Loops in Python", duration: "18:30", completed: false },
    { id: 5, title: "Functions", duration: "20:15", completed: false },
    { id: 6, title: "Lists and Dictionaries", duration: "22:40", completed: false },
];

export default function LessonPage() {
    const [showAIChat, setShowAIChat] = useState(false);

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            {/* Sidebar */}
            <div className="w-80 overflow-y-auto border-r border-gray-200 bg-white p-4">
                <h2 className="mb-4 font-bold text-gray-900">Python Programming</h2>

                <div className="space-y-2">
                    {lessons.map((lesson, i) => (
                        <div
                            key={lesson.id}
                            className={`flex items-center gap-3 rounded-lg p-3 ${lesson.current
                                ? "border-2 border-primary-300 bg-primary-50"
                                : "hover:bg-gray-50"
                                }`}
                        >
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${lesson.completed
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {lesson.completed ? "✓" : i + 1}
                            </div>

                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">
                                    {lesson.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {lesson.duration}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Video Player */}
                <div className="flex aspect-video items-center justify-center bg-black">
                    <div className="text-center text-white">
                        <div className="mb-4 text-6xl">🎬</div>
                        <div className="text-xl">Video Player</div>
                        <div className="mt-2 text-sm text-gray-400">
                            Control Flow - If Statements
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        <h1 className="mb-4 text-2xl font-bold text-gray-900">
                            Control Flow - If Statements
                        </h1>

                        <div className="prose max-w-none">
                            <p className="text-gray-700">
                                ในบทเรียนนี้เราจะเรียนรู้เกี่ยวกับ Control Flow ด้วย if statements
                                ซึ่งเป็นพื้นฐานสำคัญในการเขียนโปรแกรม
                            </p>

                            <h3 className="mt-6 font-bold text-gray-900">ตัวอย่าง Code:</h3>
                            <pre className="rounded-lg bg-gray-900 p-4 text-sm text-white">
                                {`age = 18
                                    if age >= 18:
                                        print("You are an adult")
                                    else:
                                        print("You are a minor")`}
                            </pre>

                            <div className="mt-6 rounded-lg border-l-4 border-primary-500 bg-primary-50 p-4">
                                <div className="font-medium text-primary-900">💡 เคล็ดลับ</div>
                                <div className="mt-1 text-sm text-primary-800">
                                    ใช้ if statements เมื่อต้องการให้โปรแกรมตัดสินใจตามเงื่อนไข
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <Button variant="outline" className="flex-1">
                                ← บทก่อนหน้า
                            </Button>
                            <Button className="flex-1">บทถัดไป →</Button>
                        </div>
                    </div>

                    {/* AI Chat */}
                    {showAIChat && (
                        <div className="w-96 border-l border-gray-200 bg-white">
                            <div className="flex h-full flex-col">
                                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                                    <div className="font-bold text-gray-900">🤖 AI Tutor</div>
                                    <button
                                        onClick={() => setShowAIChat(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="flex-1 space-y-4 overflow-y-auto p-4">
                                    <div className="rounded-lg bg-gray-100 p-3 text-sm">
                                        สวัสดีครับ! มีอะไรให้ช่วยไหมครับ? 😊
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 p-4">
                                    <div className="flex gap-2">
                                        <Input placeholder="พิมพ์คำถาม..." className="flex-1" />
                                        <Button>ส่ง</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Floating AI Button */}
                {!showAIChat && (
                    <button
                        onClick={() => setShowAIChat(true)}
                        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-2xl text-white shadow-lg transition-transform hover:scale-110"
                    >
                        🤖
                    </button>
                )}
            </div>
        </div>
    );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Course {
    id: string | number;
    title: string;
    category: string;
    level: string;
    duration: string;
    students: number;
    rating: number;
    emoji: string;
    progress: number;
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('http://localhost:4000/courses');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();

                const formattedData = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    category: item.category || "General",
                    level: item.level || "Beginner",
                    duration: item.duration || "10 hours",
                    students: item.students || Math.floor(Math.random() * 1000),
                    rating: item.rating || 4.5,
                    emoji: item.emoji || "📚",
                    progress: item.progress || 0,
                }));

                setCourses(formattedData);
            } catch (error) {
                console.error("Error loading courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = selectedCategory === "ทั้งหมด"
        ? courses
        : courses.filter(c => c.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">คอร์สเรียนทั้งหมด</h1>
                    <p className="text-gray-600">เลือกคอร์สที่คุณสนใจและเริ่มเรียนได้เลย</p>
                </div>

                {/* Filter Buttons */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {["ทั้งหมด", "Programming", "Web Dev", "Languages", "Data Science", "Mathematics"].map(
                        (filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedCategory(filter)} // เพิ่ม onClick
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors
                                    ${selectedCategory === filter
                                        ? "border-primary-500 bg-primary-50 text-primary-600"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-600"
                                    }`}
                            >
                                {filter}
                            </button>
                        )
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">กำลังโหลดข้อมูลคอร์ส...</div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCourses.map((course) => (
                            <Card key={course.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100 text-8xl">
                                    {course.emoji}
                                </div>
                                <div className="p-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                                            {course.category}
                                        </span>
                                        <span className="text-sm text-gray-500">{course.level}</span>
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{course.title}</h3>
                                    <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                                        <span>⏱️ {course.duration}</span>
                                        <span>👥 {course.students.toLocaleString()}</span>
                                        <span>⭐ {course.rating}</span>
                                    </div>
                                    {course.progress > 0 ? (
                                        <div>
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="text-gray-600">ความคืบหน้า</span>
                                                <span className="font-medium text-primary-600">{course.progress}%</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-600"
                                                    style={{ width: `${course.progress}%` }}
                                                ></div>
                                            </div>
                                            <Link href={`/lesson/${course.id}`}>
                                                <Button className="mt-4 w-full">เรียนต่อ</Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <Link href={`/course/${course.id}`}>
                                            <Button variant="outline" className="w-full">
                                                ดูรายละเอียด
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
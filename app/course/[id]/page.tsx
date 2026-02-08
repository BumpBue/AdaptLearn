"use client";

import { useState, useEffect, use } from "react"; // 1. เพิ่ม use ตรงนี้
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Lesson {
  id: string | number;
  title: string;
  duration: string;
  completed: boolean;
  current: boolean;
  orderIndex: number;
}

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  reviewCount: number;
  lessonCount: number;
  emoji: string;
  whatYouWillLearn: string[];
  lessons: Lesson[];
}

// 2. แก้ Type ของ params เป็น Promise
export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 3. ใช้ use() เพื่อแกะค่า id ออกมาจาก Promise
  const { id } = use(params); 

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        // ใช้ id ที่แกะออกมาแล้ว (ไม่ต้อง params.id แล้ว)
        const res = await fetch(`http://localhost:4000/courses/${id}`);

        if (!res.ok) throw new Error('Course not found');

        const data = await res.json();

        const formattedCourse: CourseDetail = {
          id: data.id,
          title: data.title || "Untitled Course",
          description: data.description || "เรียนรู้พื้นฐาน...",
          category: data.category || "General",
          level: data.level || "Beginner",
          duration: data.duration || "10 hours",
          students: data.students || 1234,
          rating: data.rating || 4.8,
          reviewCount: data.reviews || 500,
          lessonCount: data.lessons ? data.lessons.length : 0,
          emoji: data.emoji || "🎓",
          whatYouWillLearn: [
            "เข้าใจพื้นฐานสำคัญ",
            "ประยุกต์ใช้งานได้จริง",
            "เทคนิคระดับสูง",
            "Best Practices ต่างๆ"
          ],
          lessons: data.lessons?.map((l: any, index: number) => ({
            id: l.id,
            title: l.title || `Lesson ${index + 1}`,
            duration: l.duration || "15:00",
            completed: false,
            current: index === 0,
            orderIndex: l.orderIndex || index
          })) || []
        };

        setCourse(formattedCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]); // เปลี่ยน dependency เป็น id ที่แกะมาแล้ว

  // ... (ส่วน return ด้านล่างเหมือนเดิมทุกประการ)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-500 animate-pulse">กำลังโหลดข้อมูลคอร์ส...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="text-xl text-gray-800">ไม่พบคอร์สที่คุณค้นหา</div>
        <Link href="/">
          <Button variant="outline">กลับหน้าหลัก</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-8">
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white/20 text-7xl backdrop-blur-sm">
              {course.emoji}
            </div>
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                  {course.category}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                  {course.level}
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-bold">{course.title}</h1>
              <p className="mb-6 text-lg text-primary-100">
                {course.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <span>⏱️ {course.duration}</span>
                <span>👥 {course.students.toLocaleString()} students</span>
                <span>⭐ {course.rating} ({course.reviewCount} reviews)</span>
                <span>📚 {course.lessonCount} lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">

            {/* What you will learn */}
            <Card className="mb-8 p-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">สิ่งที่คุณจะได้เรียนรู้</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {course.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Course Content / Lessons */}
            <Card className="mb-8 p-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">เนื้อหาในคอร์ส</h2>
              <div className="space-y-3">
                {course.lessons.length > 0 ? (
                  course.lessons.map((lesson, i) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-primary-300 hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${lesson.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                            }`}
                        >
                          {lesson.completed ? "✓" : i + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{lesson.title}</div>
                          <div className="text-sm text-gray-500">{lesson.duration}</div>
                        </div>
                      </div>
                      {lesson.current && (
                        <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                          กำลังเรียน
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">ยังไม่มีบทเรียนในคอร์สนี้</div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">รายละเอียดคอร์ส</h2>
              <div className="prose max-w-none text-gray-700">
                {course.description}
              </div>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20 p-6">
              <div className="mb-6 text-center">
                <div className="mb-2 text-4xl font-bold text-gray-900">ฟรี</div>
                <div className="text-gray-600">Lifetime Access</div>
              </div>

              {/* ลิงก์เริ่มเรียน ใช้ ID จริงแล้ว */}
              <Link href={`/lesson/${course.id}`}>
                <Button className="mb-4 w-full">เริ่มเรียนเลย</Button>
              </Link>

              <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>เข้าถึงได้ตลอดชีพ</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>ดูได้บนมือถือและคอมพิวเตอร์</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>AI Tutor ตอบคำถาม 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span>✓</span>
                  <span>Certificate of Completion</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
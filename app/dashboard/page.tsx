import { Card } from "@/components/ui/Card";
const courses = [
    {
        id: 3,
        title: "English for Beginners",
        category: "Languages",
        emoji: "🇬🇧",
        progress: 35,
    },
    {
        id: 5,
        title: "Algebra Fundamentals",
        category: "Mathematics",
        emoji: "🔢",
        progress: 60,
    },
];
export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>
                {/* Stats */}
                <div className="mb-8 grid gap-6 md:grid-cols-4">
                    {[
                        {
                            label: "คอร์สที่เรียน",
                            value: "3",
                            icon: "📚",
                            color: "from-primary-500 to-primary-600",
                        },
                        {
                            label: "เรียนจบแล้ว",
                            value: "0",
                            icon: "✓",
                            color: "from-green-500 to-green-600",
                        },
                        {
                            label: "Study Streak",
                            value: "7 วัน",
                            icon: "🔥",
                            color: "from-red-500 to-red-600",
                        },
                        {
                            label: "คะแนนเฉลี่ย",
                            value: "85%",
                            icon: "⭐",
                            color: "from-secondary-500 to-secondary-600",
                        },
                    ].map((stat, i) => (
                        <Card key={i} className="p-6">
                            <div
                                className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color} text-2xl text-white`}
                            >
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </Card>
                    ))}
                </div>

                {/* Progress */}
                <Card className="mb-8 p-6">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">ความคืบหน้า</h2>
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <div key={course.id}>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{course.emoji}</span>
                                        <div>
                                            <div className="font-medium text-gray-900">{course.title}</div>
                                            <div className="text-sm text-gray-500">{course.category}</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-primary-600">{course.progress}%</div>
                                </div>
                                <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-600"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Activity Heatmap */}
                <Card className="p-6">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">กิจกรรมการเรียน (7 วันล่าสุด)</h2>
                    <div className="flex gap-2">
                        {[
                            { day: "จ", active: true },
                            { day: "อ", active: true },
                            { day: "พ", active: true },
                            { day: "พฤ", active: false },
                            { day: "ศ", active: true },
                            { day: "ส", active: true },
                            { day: "อา", active: true },
                        ].map((day, i) => (
                            <div key={i} className="flex-1 text-center">
                                <div
                                    className={`mx-auto mb-2 h-16 w-full rounded-lg ${day.active
                                            ? "bg-gradient-to-br from-primary-500 to-secondary-600"
                                            : "bg-gray-200"
                                        }`}
                                ></div>
                                <div className="text-sm text-gray-600">{day.day}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
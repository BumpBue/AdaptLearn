import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <Card className="mb-8 p-8">
                    <div className="flex items-start gap-6">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-4xl text-white">
                            👤
                        </div>
                        <div className="flex-1">
                            <h1 className="mb-2 text-2xl font-bold text-gray-900">Tony Doe</h1>
                            <p className="mb-4 text-gray-600">john.doe@email.com</p>
                            <div className="flex gap-4">
                                <Button variant="outline">แก้ไขโปรไฟล์</Button>
                                <Button variant="outline">เปลี่ยนรหัสผ่าน</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="mb-8 grid gap-6 md:grid-cols-3">
                    <Card className="p-6 text-center">
                        <div className="mb-2 text-3xl font-bold text-gray-900">3</div>
                        <div className="text-gray-600">คอร์สที่เรียน</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="mb-2 text-3xl font-bold text-gray-900">127</div>
                        <div className="text-gray-600">ชั่วโมงเรียน</div>
                    </Card>
                    <Card className="p-6 text-center">
                        <div className="mb-2 text-3xl font-bold text-gray-900">42</div>
                        <div className="text-gray-600">เหรียญที่ได้รับ</div>
                    </Card>
                </div>

                <Card className="p-6">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">เหรียญความสำเร็จ</h2>
                    <div className="grid gap-4 md:grid-cols-4">
                        {[
                            { icon: "🎯", name: "First Lesson", earned: true },
                            { icon: "🔥", name: "7-Day Streak", earned: true },
                            { icon: "⭐", name: "Perfect Quiz", earned: true },
                            { icon: "🏆", name: "Course Master", earned: false },
                            { icon: "👥", name: "Team Player", earned: true },
                            { icon: "💯", name: "100% Complete", earned: false },
                            { icon: "🌟", name: "Top Learner", earned: false },
                            { icon: "🎓", name: "Graduate", earned: false },
                        ].map((badge, i) => (
                            <div
                                key={i}
                                className={`rounded-xl border p-4 text-center ${badge.earned
                                        ? "border-primary-300 bg-primary-50"
                                        : "border-gray-200 bg-gray-50"
                                    }`}
                            >
                                <div className={`mb-2 text-4xl ${badge.earned ? "" : "grayscale"}`}>
                                    {badge.icon}
                                </div>
                                <div
                                    className={`text-sm font-medium ${badge.earned ? "text-gray-900" : "text-gray-400"
                                        }`}
                                >
                                    {badge.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
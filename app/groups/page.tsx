import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
const studyGroups = [
    {
        id: 1,
        name: "Python Study Squad",
        members: 12,
        course: "Python Programming",
        active: 5,
    },
    {
        id: 2,
        name: "React Developers",
        members: 8,
        course: "Web Development",
        active: 3,
    },
    {
        id: 3,
        name: "English Practice",
        members: 15,
        course: "English for Beginners",
        active: 7,
    },
];
export default function GroupsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div><h1 className="mb-2 text-3xl font-bold text-gray-900">กลุ่มเรียน</h1>
                        <p className="text-gray-600">เรียนรู้ร่วมกับเพื่อนๆ</p>
                    </div>
                    <Button>+ สร้างกลุ่มใหม่</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {studyGroups.map((group) => (
                        <Card key={group.id} className="p-6 transition-shadow hover:shadow-lg">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 text-2xl">
                                    👥
                                </div>
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    {group.active} online
                                </span>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">{group.name}</h3>
                            <p className="mb-4 text-sm text-gray-600">{group.course}</p>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <span className="text-sm text-gray-600">{group.members} สมาชิก</span>
                                <Button size="sm" variant="outline">
                                    เข้าร่วม
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
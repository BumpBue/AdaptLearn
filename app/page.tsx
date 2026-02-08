import Link from "next/link";
import { ArrowRight, Sparkles, Brain, Users, Trophy } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Background Blobs - ย้ายมาไว้ตรงนี้และคุม Layer ให้ดี */}
        <div className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-primary-200 opacity-20 blur-3xl sm:h-96 sm:w-96"></div>
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-secondary-200 opacity-20 blur-3xl sm:h-96 sm:w-96"></div>

        {/* Content Container - เพิ่ม relative z-10 เพื่อให้ลอยเหนือ Background ชัดเจน */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              AI-Powered Personalized Learning
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              เรียนรู้แบบ{" "}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-700 bg-clip-text text-transparent">
                ปรับตัว
              </span>
              <br className="hidden sm:block" />{" "}
              <span className="block sm:inline">ตามความสามารถของคุณ</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 sm:mb-10 sm:text-lg">
              ระบบการเรียนรู้อัจฉริยะที่ปรับเนื้อหาและความยากให้เหมาะกับแต่ละคน
              พร้อม AI Tutor ช่วยตอบคำถาม 24/7
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  เริ่มเรียนฟรี
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/courses" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  ดูคอร์สเรียน
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              ทำไมต้อง AdaptLearn?
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              เทคโนโลยี AI ที่ช่วยให้คุณเรียนรู้ได้เร็วขึ้นและมีประสิทธิภาพมากขึ้น
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4">
            {/* Feature 1 */}
            <Card className="border-none shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 sm:h-14 sm:w-14">
                  <Brain className="h-6 w-6 text-primary-600 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  ปรับตัวอัตโนมัติ
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  ระบบวิเคราะห์ความสามารถและปรับเส้นทางการเรียนให้เหมาะกับคุณ
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-none shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 sm:h-14 sm:w-14">
                  <Sparkles className="h-6 w-6 text-secondary-700 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  AI Tutor 24/7
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  ถามคำถามได้ทันทีไม่ต้องรอ AI จะอธิบายให้เข้าใจง่าย
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-none shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 sm:h-14 sm:w-14">
                  <Users className="h-6 w-6 text-primary-600 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  เรียนเป็นกลุ่ม
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  สร้างกลุ่มเรียนกับเพื่อน แชท และช่วยเหลือกัน
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-none shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 sm:h-14 sm:w-14">
                  <Trophy className="h-6 w-6 text-secondary-700 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                  ทบทวนอัจฉริยะ
                </h3>
                <p className="text-sm text-gray-600 sm:text-base">
                  ระบบแจ้งเตือนให้ทบทวนก่อนที่จะลืม จำได้นานขึ้น 3 เท่า
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-700 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold sm:mb-2 sm:text-4xl">10,000+</div>
              <div className="text-sm text-primary-100 sm:text-base">นักเรียนที่ไว้วางใจ</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold sm:mb-2 sm:text-4xl">500+</div>
              <div className="text-sm text-primary-100 sm:text-base">คอร์สเรียน</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold sm:mb-2 sm:text-4xl">95%</div>
              <div className="text-sm text-primary-100 sm:text-base">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-4xl">
            พร้อมที่จะเริ่มเรียนรู้แล้วหรือยัง?
          </h2>
          <p className="mb-8 text-base text-gray-600 sm:text-lg">
            เริ่มต้นฟรีวันนี้ ไม่ต้องใช้บัตรเครดิต เรียนได้ทุกที่ทุกเวลา
          </p>
          <div className="flex justify-center">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                สมัครเลยตอนนี้
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
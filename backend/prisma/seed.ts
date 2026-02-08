import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.quizAttempt.deleteMany();
    await prisma.groupMember.deleteMany();
    await prisma.studyGroup.deleteMany();
    await prisma.progress.deleteMany();
    await prisma.enrollment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.create({
        data: {
            email: 'john@example.com',
            password: hashedPassword,
            name: 'John Doe',
            role: 'STUDENT',
        },
    });

    // Create courses
    const pythonCourse = await prisma.course.create({
        data: {
            title: 'Python Programming Basics',
            description: 'เรียนรู้พื้นฐาน Python ตั้งแต่ต้นจนสามารถเขียนโปรแกรมได้จริง',
            category: 'Programming',
            level: 'BEGINNER',
            duration: 720, // 12 hours
            emoji: '🐍',
            rating: 4.8,
            students: 1234,
            published: true,
        },
    });

    const reactCourse = await prisma.course.create({
        data: {
            title: 'Web Development with React',
            description: 'เรียนรู้การพัฒนา Web Application ด้วย React',
            category: 'Web Dev',
            level: 'INTERMEDIATE',
            duration: 1200, // 20 hours
            emoji: '⚛️',
            rating: 4.9,
            students: 856,
            published: true,
        },
    });

    const englishCourse = await prisma.course.create({
        data: {
            title: 'English for Beginners',
            description: 'เรียนภาษาอังกฤษตั้งแต่พื้นฐาน',
            category: 'Languages',
            level: 'BEGINNER',
            duration: 900, // 15 hours
            emoji: '🇬🇧',
            rating: 4.7,
            students: 2341,
            published: true,
        },
    });

    // Create lessons for Python course
    await prisma.lesson.createMany({
        data: [
            {
                courseId: pythonCourse.id,
                title: 'Introduction to Python',
                description: 'รู้จักกับ Python และติดตั้งโปรแกรม',
                type: 'VIDEO',
                content: 'Video content here',
                duration: 10,
                orderIndex: 1,
            },
            {
                courseId: pythonCourse.id,
                title: 'Variables and Data Types',
                description: 'เรียนรู้เกี่ยวกับตัวแปรและชนิดข้อมูล',
                type: 'VIDEO',
                content: 'Video content here',
                duration: 15,
                orderIndex: 2,
            },
            {
                courseId: pythonCourse.id,
                title: 'Control Flow - If Statements',
                description: 'เรียนรู้การควบคุมการทำงานด้วย if statements',
                type: 'VIDEO',
                content: `# Control Flow - If Statements

## ตัวอย่าง Code

\`\`\`python
age = 18
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
\`\`\`

## คำอธิบาย
if statement เป็นคำสั่งที่ใช้ในการตัดสินใจ...`,
                duration: 12,
                orderIndex: 3,
            },
            {
                courseId: pythonCourse.id,
                title: 'Loops in Python',
                description: 'เรียนรู้การใช้ Loop',
                type: 'VIDEO',
                content: 'Video content here',
                duration: 18,
                orderIndex: 4,
            },
        ],
    });

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
        data: {
            userId: user.id,
            courseId: englishCourse.id,
            progress: 35,
            status: 'IN_PROGRESS',
        },
    });

    // Create study groups
    await prisma.studyGroup.createMany({
        data: [
            {
                name: 'Python Study Squad',
                description: 'เรียน Python ร่วมกัน',
                maxMembers: 15,
            },
            {
                name: 'React Developers',
                description: 'เรียน React ร่วมกัน',
                maxMembers: 10,
            },
        ],
    });

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { api } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [signupForm, setSignupForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await api.login(loginForm.email, loginForm.password);
            api.setToken(result.token);
            router.push("/courses");
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await api.register(signupForm.email, signupForm.password, signupForm.name);
            api.setToken(result.token);
            router.push("/courses");
        } catch (err: any) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-700">
                        <BookOpen className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">ยินดีต้อนรับกลับ</h2>
                    <p className="mt-2 text-gray-600">เข้าสู่ระบบเพื่อเริ่มเรียนต่อ</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                    <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
                        <button
                            onClick={() => {
                                setActiveTab("login");
                                setError("");
                            }}
                            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === "login"
                                    ? "bg-white text-gray-900 shadow"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            เข้าสู่ระบบ
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("signup");
                                setError("");
                            }}
                            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === "signup"
                                    ? "bg-white text-gray-900 shadow"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            สมัครสมาชิก
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {activeTab === "login" ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    อีเมล
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="pl-10"
                                        value={loginForm.email}
                                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    รหัสผ่าน
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-10 pr-12"
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    ชื่อ-นามสกุล
                                </label>
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    value={signupForm.name}
                                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    อีเมล
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="pl-10"
                                        value={signupForm.email}
                                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    รหัสผ่าน
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-10 pr-12"
                                        value={signupForm.password}
                                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                            </Button>
                        </form>
                    )}
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ทดสอบด้วย:{" "}
                    <button
                        onClick={() => {
                            setLoginForm({ email: "john@example.com", password: "password123" });
                            setActiveTab("login");
                        }}
                        className="font-medium text-primary-600 hover:text-primary-700"
                    >
                        john@example.com / password123
                    </button>
                </p>
            </div>
        </div>
    );
}
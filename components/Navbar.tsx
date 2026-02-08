"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, BookOpen, Bell, User } from "lucide-react";
import Button from "./ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-700">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              AdaptLearn
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="/courses"
              className="text-gray-700 hover:text-primary-600"
            >
              คอร์สเรียน
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-primary-600"
            >
              ความคืบหน้า
            </Link>
            <Link
              href="/groups"
              className="text-gray-700 hover:text-primary-600"
            >
              กลุ่มเรียน
            </Link>

            <button className="text-gray-700 hover:text-primary-600">
              <Bell className="h-5 w-5" />
            </button>

            <Link href="/profile">
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/courses"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              คอร์สเรียน
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              ความคืบหน้า
            </Link>
            <Link
              href="/groups"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              กลุ่มเรียน
            </Link>
            <Link
              href="/profile"
              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
            >
              โปรไฟล์
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
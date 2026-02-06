"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChefHat, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const navLinks = [
  { href: "/jobs", label: "채용공고" },
  { href: "/talents", label: "인재찾기" },
  { href: "/supply", label: "식자재" },
  { href: "/community", label: "함께수다" },
];

export function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm safe-area-inset-top">
      <div className="mx-auto flex h-14 min-h-[56px] max-w-[1200px] items-center justify-between gap-2 px-4 sm:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
          <ChefHat className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
          <span className="text-lg font-bold text-gray-900 sm:text-xl">함께차이나</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 max-w-md mx-4 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="지역, 포지션으로 검색"
              className="pl-9 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* 데스크탑 네비 */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname.startsWith(link.href) ? "text-primary" : "text-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link href="/supply/cart" className="text-sm text-gray-600 hover:text-primary px-2 py-1.5">
            장바구니
          </Link>
          <Link href="/my">
            <Button variant="ghost" size="sm" className="hidden xl:inline-flex">
              마이페이지
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="hidden sm:inline-flex">
              회원가입
            </Button>
          </Link>
        </div>

        {/* 모바일 햄버거 */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg lg:hidden touch-manipulation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <form onSubmit={handleSearch} className="p-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="검색"
                className="pl-9 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
          <nav className="flex flex-col p-4 pt-0 max-h-[60vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 px-2 text-base font-medium border-b border-gray-100 last:border-0 touch-manipulation ${
                  pathname.startsWith(link.href) ? "text-primary" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200">
              <Link href="/supply/cart" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-3 px-2 text-base font-medium text-gray-700">장바구니</span>
              </Link>
              <Link href="/my" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-3 px-2 text-base font-medium text-gray-700">마이페이지</span>
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full h-12 text-base">
                  로그인
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-12 text-base">회원가입</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

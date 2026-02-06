import Link from "next/link";

const footerLinks = {
  service: [
    { href: "/notice", label: "공지사항" },
    { href: "/support", label: "고객센터" },
    { href: "/faq", label: "자주 묻는 질문" },
  ],
  legal: [
    { href: "/terms", label: "이용약관" },
    { href: "/privacy", label: "개인정보처리방침" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto safe-area-inset-bottom">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-5 sm:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Link href="/" className="text-lg font-bold text-gray-900">
              함께차이나
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              채용·취업·식자재·커뮤니티를 한곳에서. 중식업 전 분야를 아우르는 플랫폼
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                서비스
              </h4>
              <ul className="space-y-2">
                {footerLinks.service.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                약관
              </h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} 함께차이나. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export const dynamic = "force-dynamic";

export default function NoticePage() {
  // 공지사항 모델이 없으면 빈 목록
  const notices: { id: string; title: string; content: string; createdAt: Date }[] = [];

  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">공지사항</h1>
      {notices.length === 0 ? (
        <p className="text-center py-16 text-gray-500">
          등록된 공지사항이 없습니다.
        </p>
      ) : (
        <ul className="space-y-4">
          {notices.map((n) => (
            <li
              key={n.id}
              className="rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">{n.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(n.createdAt).toLocaleDateString("ko-KR")}
              </p>
              <p className="text-gray-600 mt-2">{n.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

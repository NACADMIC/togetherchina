export default function SupportPage() {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">고객센터</h1>
      <div className="space-y-6 text-gray-600">
        <p>문의사항이 있으시면 아래로 연락해 주세요.</p>
        <div className="rounded-lg border border-gray-200 p-6">
          <p className="font-medium text-gray-900">이메일</p>
          <p>support@hamkkechina.com</p>
          <p className="font-medium text-gray-900 mt-4">운영시간</p>
          <p>평일 09:00 - 18:00</p>
        </div>
      </div>
    </div>
  );
}

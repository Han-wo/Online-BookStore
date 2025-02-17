export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl">
        <div className="border-b bg-white px-6 py-4">
          <h1 className="text-18-600 text-gray-900">도서 등록</h1>
          <p className="mt-1 text-14-500 text-gray-500">
            새로운 도서를 등록하기 위한 정보를 입력해주세요.
          </p>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

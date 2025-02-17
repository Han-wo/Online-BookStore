import BookForm from "./components/BookForm";

export default function CreateBookPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-24-700 ">새 책 등록</h1>
      <BookForm />
    </div>
  );
}

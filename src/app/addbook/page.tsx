import BookForm from "./components/BookForm";

export default function CreateBookPage() {
  return (
    <div className="mx-auto h-full max-w-4xl p-4">
      <h1 className="my-10 text-24-700">새 책 등록</h1>
      <BookForm />
    </div>
  );
}

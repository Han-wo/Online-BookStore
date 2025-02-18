import { useRouter } from "next/navigation";
import { FaRegSquarePlus } from "react-icons/fa6";

import Button from "../common/Button";

export default function BookHeader() {
  const router = useRouter();

  return (
    <div className="mb-15 flex items-center justify-between">
      <h1 className="text-24-700">도서 목록</h1>
      <Button
        type="button"
        onClick={() => router.push("/addbook")}
        className="flex items-center gap-2"
      >
        <FaRegSquarePlus className="size-20" />새 책 등록
      </Button>
    </div>
  );
}

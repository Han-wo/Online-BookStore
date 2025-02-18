import { AiOutlineClose } from "react-icons/ai";

import Input from "../common/Input";

interface BookSearchProps {
  keyword: string;
  onSearch: (value: string) => void;
  className?: string;
}

export default function BookSearch({
  keyword,
  onSearch,
  className,
}: BookSearchProps) {
  return (
    <div className={`relative flex-1 ${className} mb-10`}>
      <Input
        placeholder="제목 또는 저자로 검색"
        value={keyword}
        onChange={(e) => onSearch(e.target.value)}
        className="pr-10"
      />
      {keyword && (
        <button
          type="button"
          onClick={() => onSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <AiOutlineClose className="size-20" />
        </button>
      )}
    </div>
  );
}

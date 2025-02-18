/*eslint-disable */

"use client";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { AiOutlineClose } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value?: string;
  onRemove?: () => void;
}

export default function ImageUpload({
  onChange,
  value,
  onRemove,
}: ImageUploadProps) {
  return (
    <CldUploadWidget
      onSuccess={(result: any) => onChange(result.info.secure_url)}
      uploadPreset="book-store"
      options={{
        maxFiles: 1,
        sources: ["local", "url"],
        multiple: false,
      }}
    >
      {({ open }) => (
        <div className="relative">
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              onClick={() => open?.()}
              className="relative cursor-pointer hover:opacity-70 border-2 border-dashed border-gray-300 p-20 w-full flex flex-col items-center justify-center gap-4 text-gray-600 h-200"
            >
              {value ? (
                <>
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      src={value}
                      alt="Upload"
                      className="rounded-lg"
                    />
                  </div>
                  {onRemove && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                      }}
                      className="absolute top-2 right-2 bg-rose-500 rounded-full p-1 text-white z-10"
                    >
                      <AiOutlineClose className="size-15" />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-10 h-130 justify-center">
                  <LuImagePlus className="size-20" />
                  <div className="text-16-700">책 커버 이미지 업로드</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
}

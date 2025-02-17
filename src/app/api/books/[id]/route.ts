import { NextRequest, NextResponse } from "next/server";

import mockBooks from "@/data/mockBook";

const books = [...mockBooks];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id, 10);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return NextResponse.json(
      { message: "책을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  return NextResponse.json(book);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id, 10);
  const body = await request.json();

  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: "책을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  books[index] = { ...books[index], ...body };

  return NextResponse.json(books[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id, 10);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return NextResponse.json(
      { message: "책을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  books.splice(index, 1);

  return NextResponse.json({ message: "삭제되었습니다." });
}

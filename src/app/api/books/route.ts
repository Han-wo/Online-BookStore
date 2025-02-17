import { NextRequest, NextResponse } from "next/server";

import mockBooks from "@/data/mockBook";

const books = [...mockBooks];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = books.slice(startIndex, endIndex);

  return NextResponse.json({
    books: paginatedBooks,
    total: books.length,
    currentPage: page,
    totalPages: Math.ceil(books.length / limit),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const newBook = {
    ...body,
    id: books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1,
    salesCount: 0,
  };

  books.push(newBook);

  return NextResponse.json(newBook, { status: 201 });
}

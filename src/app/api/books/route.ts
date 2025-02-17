import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const booksRef = collection(db, "books");
    // 생성일 기준 내림차순 정렬 (최신순)
    const q = query(booksRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const allBooks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = allBooks.slice(startIndex, endIndex);

    return NextResponse.json({
      books: paginatedBooks,
      total: allBooks.length,
      currentPage: page,
      totalPages: Math.ceil(allBooks.length / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "책을 가져오는데 실패했습니다" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const booksRef = collection(db, "books");

    const docRef = await addDoc(booksRef, {
      ...body,
      salesCount: 0,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "책을 추가하는데 실패했습니다" },
      { status: 500 },
    );
  }
}

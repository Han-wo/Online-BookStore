import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const docRef = doc(db, "books", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { message: "책을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    return NextResponse.json(
      { error: "책을 찾을수 없습니다" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const docRef = doc(db, "books", params.id);
    await updateDoc(docRef, body);

    const updatedDoc = await getDoc(docRef);
    return NextResponse.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    return NextResponse.json({ error: "수정에 실패했습니다" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const docRef = doc(db, "books", params.id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: "삭제되었습니다." });
  } catch (error) {
    return NextResponse.json({ error: "삭제에 실패했습니다" }, { status: 500 });
  }
}

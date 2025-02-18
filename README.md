# Online BookStore


온라인 서점을 위한 웹 애플리케이션입니다. 책을 등록, 수정, 삭제하고 목록을 조회할 수 있습니다.

## 🔗 배포 링크
[Online BookStore](https://online-book-store-lake.vercel.app/)

## 🖥️ 프로젝트 소개
책의 기본 정보(제목, 저자, 가격, 수량 등)와 이미지를 등록하고 조회할 수 있는 온라인 서점 관리자 페이지입니다.

## ⚙️ 개발 환경
- **Frontend**: Next.js 14, TypeScript
- **Backend**: Firebase (Firestore)
- **이미지 저장소**: Cloudinary
- **배포**: Vercel

## 📌 주요 기능
### 책 목록
- 등록된 모든 책 목록 조회
- 페이지당 10개씩 표시
- 제목/저자 기반 실시간 검색
- 클릭 시 상세 정보 모달로 표시

### 책 관리
- 새로운 책 등록
- 기존 책 정보 수정
- 책 삭제 (삭제 전 확인)

### 이미지 업로드
- Cloudinary 위젯을 통한 이미지 업로드
- 업로드된 이미지 URL을 Firestore에 저장
- 자동 이미지 최적화
- 이미지 크기 조정 및 포맷 최적화
- 이미지 수정 및 삭제 기능

### 폼 처리
- React Hook Form을 사용한 폼 관리
- Zod를 통한 유효성 검사
- 실시간 에러 메시지 표시
- 이미지 업로드 상태 관리

  
### 데이터 관리
- React Query를 사용한 서버 상태 관리
- 낙관적 업데이트
- 자동 캐시 무효화
- 필요한 페이지 캐싱작업

## 🛠️ 사용 기술
### Frontend
- `Next.js 14`: App Router, Server Components
- `TypeScript`: 정적 타입 검사
- `React Query`: 서버 상태 관리
- `React Hook Form`: 폼 상태 관리
- `Zod`: 데이터 유효성 검사
- `Tailwind CSS`: 스타일링
- `Next Cloudinary`: 이미지 업로드

### Backend
- `Firebase Firestore`: 데이터베이스
- `Cloudinary`: 이미지 스토리지

## 📋 설치 및 실행
1. 저장소 클론
```bash
git clone https://github.com/Han-wo/Online-BookStore.git
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.local` 파일 생성:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

4. 개발 서버 실행
```bash
npm run dev
```

## 📁 폴더 구조
```
├── app/
│   ├── api/
│   │   └── books/     # API 라우트
│   ├── books/
│   │   └── edit/      # 책 수정 페이지
│   └── page.tsx       # 메인 페이지
├── components/
│   ├── books/         # 책 관련 컴포넌트
│   └── common/        # 공통 컴포넌트
├── hooks/             # 커스텀 훅
├── lib/              # 유틸리티
└── types/            # 타입 정의
```

## 🔒 구현 내용

### 책 목록
```typescript
export default function BookList() {
  const { data, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => bookAPI.getBooks()
  });

  return (
    // 목록 렌더링 로직
  );
}
```

### 이미지 업로드
```typescript
export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  return (
    <CldUploadWidget
      onSuccess={(result) => onChange(result.info.secure_url)}
      uploadPreset="books_preset"
    >
      {/* 업로드 UI */}
    </CldUploadWidget>
  );
}
```

### 폼 유효성 검사
```typescript

const bookSchema = z.object({
  title: z
    .string({
      required_error: "제목을 입력해주세요",
    })
    .min(1, "제목을 입력해주세요"),
  author: z
    .string({
      required_error: "저자를 입력해주세요",
    })
    .min(1, "저자를 입력해주세요"),
  description: z
    .string({
      required_error: "설명을 입력해주세요",
    })
    .min(1, "설명을 입력해주세요"),
...
});

export default bookSchema;
```

## 🚀 개선 사항
- [ ] 로그인/회원가입 기능 추가


## 👤 제작자
- GitHub: [@Han-wo](https://github.com/Han-wo)

# Online Bookstore
온라인 서점을 위한 웹 애플리케이션입니다. 책을 등록, 수정, 삭제하고 목록을 조회할 수 있습니다.

## 배포주소 : https://online-book-store-lake.vercel.app/

## 기능
- 책 목록 조회 (페이지네이션)
- 책 검색 (제목, 저자)
- 책 상세 정보 조회 (모달)
- 책 등록/수정/삭제
- 실시간 재고 관리
- 이미지 업로드 및 관리 (Cloudinary)

## 기술 스택
### Frontend
- Next.js 14
- TypeScript
- React Query (TanStack Query)
- React Hook Form
- Zod
- Tailwind CSS
- Next Cloudinary

### Backend
- Firebase (Firestore)
- Cloudinary (이미지 저장소)

## 주요 기능 설명

### 1. 책 목록 조회
- 페이지당 10개의 책을 표시
- 클라이언트 사이드 검색 기능
- 반응형 그리드 레이아웃
- 책 커버 이미지 표시

### 2. 책 상세 정보
- 모달을 통한 상세 정보 표시
- 제목, 저자, 가격, 재고, 판매량 등 표시
- 고품질 책 커버 이미지 표시

### 3. 책 관리
- 새로운 책 등록 (이미지 업로드 포함)
- 기존 책 정보 수정 (이미지 수정/삭제 가능)
- 책 삭제 (삭제 확인 대화상자)

### 4. 이미지 처리
- Cloudinary 이미지 업로드 위젯 통합
- 자동 이미지 최적화
- 이미지 크기 조정 및 포맷 최적화
- 반응형 이미지 처리

### 5. 폼 처리
- React Hook Form을 사용한 폼 관리
- Zod를 통한 유효성 검사
- 실시간 에러 메시지 표시
- 이미지 업로드 상태 관리

### 6. 데이터 관리
- React Query를 사용한 서버 상태 관리
- 낙관적 업데이트
- 자동 캐시 무효화

## 설치 및 실행 방법
```bash
# 저장소 클론
git clone https://github.com/Han-wo/Online-BookStore.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 환경 변수 설정
`.env.local` 파일을 프로젝트 루트에 생성하고 다음 변수들을 설정하세요:

```
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary 설정
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## 폴더 구조
```
├── app/
│   ├── api/
│   │   └── books/
│   ├── books/
│   │   └── edit/
│   └── page.tsx
├── components/
│   ├── books/
│   │   ├── BookCard.tsx
│   │   ├── BookDetail.tsx
│   │   ├── BookForm.tsx
│   │   └── BookList.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── ImageUpload.tsx
│       └── Modal.tsx
├── hooks/
│   └── useBooks.ts
├── lib/
│   ├── firebase.ts
│   └── validations/
│       └── books.ts
└── types/
    └── book.ts
```

## 추가 설정

### Cloudinary 설정
1. Cloudinary 계정 생성
2. Upload preset 생성 (Settings > Upload > Upload presets)
3. Signing Mode를 'Unsigned'로 설정
4. 환경 변수에 cloud name 추가

### Next.js 설정
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com']
  }
}
```

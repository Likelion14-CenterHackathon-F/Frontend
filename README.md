# Frontend

프론트엔드 레포지토리입니다.

## 실행 방법

```bash
npm install
npm run dev
```

### 주요 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 타입 검사 및 프로덕션 빌드
npm run preview  # 프로덕션 빌드 미리보기
npm run lint     # ESLint 실행
```

현재 구현된 라우트는 다음과 같습니다.

| 경로 | 설명    |
| ---- | ------- |
| `/`  | 홈 화면 |

## Tech Stack

| 역할      | 기술                  |
| --------- | --------------------- |
| 빌드      | Vite                  |
| UI        | React 19 + TypeScript |
| 스타일링  | Tailwind CSS 4 + CSS  |
| 라우팅    | React Router 7        |
| 서버 상태 | TanStack React Query  |
| 전역 상태 | Zustand               |
| 코드 품질 | ESLint                |

주요 의존성은 `package.json`과 `package-lock.json`을 기준으로 설치됩니다.

## 폴더 구조

```text
src/
├── apis/       # API 요청 함수
├── assets/     # 이미지, 아이콘 등 정적 리소스
├── components/ # 재사용 UI 컴포넌트
├── constants/  # 공통 상수
├── hooks/      # 커스텀 훅
├── layouts/    # 페이지 레이아웃
├── pages/      # 라우트별 페이지 컴포넌트
├── routes/     # 라우터 설정
├── stores/     # Zustand 전역 상태
├── styles/     # 전역 스타일
└── utils/      # 공통 유틸리티 함수
```

## 브랜치 전략 (GitHub Flow)

```text
main
└── dev            # 최종 테스트
└── feature/기능명   # 기능 개발
└── fix/버그명       # 버그 수정
└── refactor/대상    # 리팩토링
└── chore/작업명     # 설정, 패키지 등 기타 작업
```

### 브랜치 네이밍 예시

```text
feature/home-page
fix/navigation-error
refactor/router-structure
chore/update-dependencies
```

## 커밋 컨벤션

```text
type: 작업 내용
```

| 깃모지 | type       | 설명                      |
| ------ | ---------- | ------------------------- |
| ✨     | `feat`     | 새로운 기능 추가          |
| 🐛     | `fix`      | 버그 수정                 |
| 💄     | `style`    | UI/스타일 변경            |
| ♻️     | `refactor` | 코드 리팩토링             |
| 🔧     | `chore`    | 설정, 패키지 등 기타 작업 |
| 📝     | `docs`     | 문서 수정                 |

### 예시

```text
feat: 홈 화면 UI 구현
fix: 라우팅 오류 수정
style: 반응형 레이아웃 수정
chore: 의존성 업데이트
```

## 코드 컨벤션

- TypeScript와 React 컴포넌트는 프로젝트의 ESLint 설정을 따릅니다.
- 저장 시 자동 포맷팅을 위해 VS Code의 Prettier 확장 프로그램 사용을 권장합니다.
- 컴포넌트는 `PascalCase`, 함수와 변수는 `camelCase`를 사용합니다.

## 👥 팀원

| 이름   | 역할     | GitHub                                |
| ------ | -------- | ------------------------------------- |
| 최용주 | Frontend | [YJEND](https://github.com/YJEND)     |
| 고명준 | Frontend | [kmj0973](https://github.com/kmj0973) |

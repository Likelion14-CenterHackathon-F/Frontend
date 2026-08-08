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

| 경로           | 설명                                       |
| -------------- | ------------------------------------------ |
| `/`            | 홈 화면                                    |
| `/onboarding`  | 온보딩 (언어 → 국가·시간대 → 본인확인)     |

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

## 디자인 토큰

Figma 디자인 시안의 색상과 타이포그래피를 `src/styles/index.css`의 `@theme` 블록에 정의해 두었습니다. Tailwind CSS 4는 설정 파일(`tailwind.config.js`) 대신 이 블록을 읽어 유틸리티 클래스를 자동으로 만들어 줍니다.

**화면을 구현할 때는 hex 값을 직접 쓰지 말고 아래 클래스를 사용하세요.**

### 색상

| 토큰            | 값        | 클래스 예시          | 쓰이는 곳                             |
| --------------- | --------- | -------------------- | ------------------------------------- |
| `primary`       | `#684bdb` | `text-primary`       | 사후관리 타임라인 월 표시             |
| `primary-10`    | 위 색 10% | `bg-primary-10`      | 홈 채팅바 아이콘 버튼 배경            |
| `primary-deep`  | `#513ba7` | `text-primary-deep`  | 홈 카드 뱃지 (`5일차`, `D-2`)         |
| `text-01`       | `#2a2a2a` | `text-text-01`       | 카드 제목, 버튼 라벨 (가장 진한 본문) |
| `text-03`       | `#74717f` | `text-text-03`       | 채팅바 `+` 아이콘                     |
| `text-04`       | `#979797` | `text-text-04`       | 채팅바 입력 안내 문구                 |
| `text-muted`    | `#605c73` | `text-text-muted`    | 홈 카드 보조 설명                     |
| `icon-in`       | `#2d2d2d` | `text-icon-in`       | 채팅바 전송 화살표                    |
| `neutral-black` | `#000008` | `bg-neutral-black`   | 언어 선택, 언어 전환 드로어           |
| `neutral-white` | `#ffffff` | `text-neutral-white` | 보라색 배경 위 흰 글자                |
| `neutral-500`   | `#a8b7d4` | `text-neutral-500`   | 언어 선택, 언어 전환 드로어           |
| `surface-soft`  | `#fafafa` | `bg-surface-soft`    | 온보딩 하단 버튼 배경·테두리          |
| `border-soft`   | `#f6f4f4` | `border-border-soft` | 홈 채팅바 테두리                      |

### 타이포그래피

폰트는 **Pretendard**를 CDN으로 불러오며, `--font-sans`를 덮어썼기 때문에 별도 클래스 없이 전역에 적용됩니다.

| 토큰      | 크기 | 클래스         | 용도                        |
| --------- | ---- | -------------- | --------------------------- |
| `display` | 48px | `text-display` | 화면당 하나뿐인 최상위 문구 |
| `title`   | 36px | `text-title`   | 화면 제목, 진행 상황 표시   |
| `heading` | 20px | `text-heading` | 카드 제목, 선택된 항목      |
| `body`    | 16px | `text-body`    | 본문, 버튼 라벨, 입력창     |
| `caption` | 14px | `text-caption` | 보조 설명, 캡션, 면책 문구  |

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

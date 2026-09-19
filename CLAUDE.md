@AGENTS.md

## 색상 팔레트 (오름이 브랜드)

`app/globals.css`의 `:root`에 CSS 변수로 등록되어 있다. 컴포넌트에서는 hex 값을
직접 쓰지 말고 반드시 변수(Tailwind 유틸리티 `bg-*`/`text-*`/`border-*` 또는
`var(--color-*)`)로 참조한다.

| 변수 | 값 | 용도 |
|---|---|---|
| `--color-cream` | `#FDF3E3` | 페이지 배경 |
| `--color-moss` | `#6B8E4E` | 제목, 탭 강조, 아이콘 |
| `--color-moss-deep` | `#5A7A40` | 버튼 배경, 링크 글자 |
| `--color-sprout` | `#A8C97C` | 보조 포인트, 테두리 |
| `--color-leaf` | `#7FB35C` | 액센트, 아이콘 |
| `--color-maroon` | `#7A2E3B` | 중요 강조, 위기 정보 |
| `--color-blush` | `#F6C4C0` | 은은한 배경 포인트 |
| `--color-card` | `#FFFFFF` | 카드 배경 |
| `--color-border` | `#E6DCCB` | 테두리 (`.brand-scope`로 감싼 영역에서만 유효 — 아래 참고) |
| `--color-text` | `#33292C` | 본문 |
| `--color-text-sub` | `#6E6165` | 보조 텍스트 |

### 사용 규칙

- 페이지 배경은 cream, 카드는 흰색(card). 둘 다 cream으로 하면 카드 경계가 사라진다.
- 흰 글자를 얹는 배경은 moss-deep 또는 maroon만 쓴다. leaf와 sprout 위에는
  흰 글자를 올리지 않는다(대비 부족으로 읽히지 않음).
- leaf와 sprout는 테두리, 아이콘 선, 옅은 배경에만 쓴다.
- 본문 글자색은 text, 보조 설명은 text-sub.
- 그림자는 기본적으로 쓰지 않는다. 꼭 필요하면 `0 1px 2px rgba(0,0,0,0.04)`보다
  진하게 하지 않는다.

### 적용 범위

메인 페이지, 공통 레이아웃(`CrisisBanner`, `SiteHeader`), 마음 관리(목록+8개
주제 상세, `MindCareSubNav`), 상담 알아보기(목록+5개 하위 페이지,
`CounselSubNav`, `SourceNote`), 이용후기, 후기 작성, 교외 도움 찾기, 팀 소개,
관리자까지 전부 이 팔레트로 옮겨졌다. `components/Footer.js`, `MainNav.js`,
`Mascot.js`는 아직 옛 팔레트(`--accent` `#6B2C3E`, `--highlight` `#FBF3DC`,
`--border` `#E3DDD5` 등, `app/globals.css` 상단 `:root`에 남아 있음)를 쓴다.
남은 페이지를 옮길 때마다 이 문서를 갱신할 것.

`--color-border`(`#E6DCCB`)는 기존에 일부 컴포넌트가 쓰는 `--border`
(`#E3DDD5`)와 변수 이름이 겹치기 때문에 `:root`에 전역으로 등록하지 않았다.
대신 `.brand-scope` 클래스로 감싼 영역 안에서만 지역적으로 정의되어 있고,
새 팔레트로 옮긴 페이지는 모두 최상위 요소에 `.brand-scope
min-h-screen w-full bg-cream`을 두고 그 안에서
`border-[var(--color-border)]`처럼 참조한다. `--color-card`는 기존
`--card`와 값이 동일(`#FFFFFF`)해 충돌 걱정 없이 그냥 `bg-card`를 그대로
쓴다.

아코디언(`<details>`)의 펼침 표시는 전부 "+/×" 대신 회전하는 셰브런 SVG로
통일했다(`group-open:rotate-180`).

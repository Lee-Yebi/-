// components/RoomBackground.js
// 무궁담 방 배경 — 벽 · 창문 · 책상
// 글자는 들어 있지 않습니다. 로고·제목·카드는 전부 children 으로 넣으세요.
// 서버 컴포넌트로 동작합니다 ("use client" 필요 없음)
//
// 사용법
//   import RoomBackground, { Window } from '@/components/RoomBackground'
//   <RoomBackground>
//     <div className="room__logo">{/* 로고 이미지나 제목 */}</div>
//     <Window>{/* 카드들 */}</Window>
//   </RoomBackground>

import './room.css'

export default function RoomBackground({ children }) {
  return (
    <>
      <div className="room">
        {children}
        <Desk />
      </div>
      <div className="floor-fade" aria-hidden="true" />
    </>
  )
}

/** 창문 — 안에 넣은 내용이 창유리 위에 얹힙니다. 위쪽은 창밖 풍경이 보이도록 비워둡니다. */
export function Window({ children }) {
  return (
    <>
      <div className="window">
        <div className="window__pane">
          <div className="window__mullion" aria-hidden="true" />
          <div className="window__inner">
            <div className="window__viewgap" aria-hidden="true" />
            {children}
          </div>
        </div>
      </div>
      <div className="sill" aria-hidden="true" />
    </>
  )
}

/** 책상 — PC / 태블릿 / 모바일 이미지가 CSS 미디어쿼리로 바뀝니다. */
export function Desk() {
  return <div className="desk" aria-hidden="true" />
}

'use client'
// components/SeasonalFall.js
// 계절별 흩날림 효과. 월이 바뀌면 자동으로 바뀝니다.
//   봄 3~5월 꽃잎 · 여름 6~8월 잎 · 가을 9~11월 낙엽 · 겨울 12~2월 눈
//
// 사용법 (app/layout.js 안, 본문보다 앞에)
//   import SeasonalFall from '@/components/SeasonalFall'
//   <SeasonalFall />

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import './seasonal.css'

const COUNT = 14          // 조각 개수. 많으면 배터리를 먹습니다.

// 집중이 필요하거나 힘든 상태로 들어오는 화면에서는 띄우지 않음.
// 마스코트를 숨기는 것과 같은 방식(경로 확인 후 null 반환).
const HIDDEN_PATHS = ['/reviews/new', '/admin']

function seasonOf(month) {           // month: 1~12
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

// 조각 하나하나의 위치·속도·크기. 매번 달라지면 하이드레이션이 어긋나므로
// 고정된 값을 씁니다.
const ITEMS = Array.from({ length: COUNT }, (_, i) => ({
  x:     (i * 7.3 + 3) % 97,                 // 가로 위치 %
  dur:   9 + ((i * 3) % 7),                  // 떨어지는 시간 (초)
  delay: -((i * 1.7) % 10),                  // 시작 시점을 흩어놓음
  size:  10 + ((i * 5) % 9),                 // 크기 (px)
  op:    0.42 + ((i % 4) * 0.08),            // 투명도
}))

export default function SeasonalFall({ season }) {
  const pathname = usePathname()

  // 서버와 클라이언트의 시각이 다를 수 있어, 계절은 그려진 뒤에 정합니다.
  // (렌더 중에 날짜를 쓰면 하이드레이션 에러가 나고 페이지 클릭이 죽습니다.)
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    if (season) { setCurrent(season); return }
    const update = () => setCurrent(seasonOf(new Date().getMonth() + 1))
    update()
    // 자정을 넘겨 달이 바뀌는 경우까지 반영
    const timer = setInterval(update, 60 * 60 * 1000)
    return () => clearInterval(timer)
  }, [season])

  if (pathname.startsWith('/mind-care/') || HIDDEN_PATHS.includes(pathname)) {
    return null
  }

  if (!current) return null

  return (
    <div className={`season season--${current}`} aria-hidden="true">
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className="season__item"
          style={{
            '--x': `${it.x}%`,
            '--dur': `${it.dur}s`,
            '--delay': `${it.delay}s`,
            '--size': it.size,
            '--op': it.op,
          }}
        >
          <i />
        </span>
      ))}
    </div>
  )
}

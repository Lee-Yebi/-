"use client";

import { useState } from "react";

// 장식용 일러스트. 로딩 실패 시 자리를 아예 숨겨서 빈 네모가 남지 않게 한다.
export default function DecoImage({ src, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setFailed(true)}
      className={`pointer-events-none h-auto select-none ${className}`}
    />
  );
}

// 섹션 구분용 꽃 장식 — 가운데 꽃 하나, 양옆 1px 가로선.
export function FlowerDivider({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-px flex-1 bg-[var(--color-border)]" />
      <DecoImage src="/flower_hibiscus.png" className="mx-3 w-6 shrink-0" />
      <div className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}

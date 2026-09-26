"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// 메시지 + 표정 짝 — 여기에 추가/수정하면 됩니다.
const MASCOT_MESSAGES = [
  { mood: "happy", text: "오늘 하루도 여기까지 온 것만으로 충분해요." },
  { mood: "happy", text: "작은 걸음도 걸음이에요." },
  { mood: "happy", text: "여기까지 온 당신이 대견해요." },
  { mood: "wink", text: "잘 지내고 있나요? 물 한 잔 마시고 가요." },
  { mood: "wink", text: "오늘 잘 챙겨 먹었나요?" },
  { mood: "surprised", text: "어깨에 힘 들어가 있지 않나요? 한 번 내려볼까요." },
  { mood: "tired", text: "천천히 숨 한 번 쉬고 가요." },
  { mood: "tired", text: "지금 기분이 어떤지, 잠깐만 들여다봐 주세요." },
  { mood: "sad", text: "모든 걸 혼자 감당하지 않아도 괜찮아요." },
  { mood: "sad", text: "괜찮지 않아도 괜찮아요." },
];

const MASCOT_IMAGES = {
  default: "/mascot-default.png",
  happy: "/mascot-happy.png",
  wink: "/mascot-wink.png",
  surprised: "/mascot-surprised.png",
  tired: "/mascot-tired.png",
  sad: "/mascot-sad.png",
};

const MASCOT_ALT = {
  default: "마스코트 캐릭터",
  happy: "활짝 웃는 마스코트 캐릭터",
  wink: "윙크하는 마스코트 캐릭터",
  surprised: "놀란 표정의 마스코트 캐릭터",
  tired: "시무룩한 마스코트 캐릭터",
  sad: "눈물짓는 마스코트 캐릭터",
};

// 이 경로에서는 마스코트를 띄우지 않음
const HIDDEN_PATHS = ["/reviews/new", "/admin"];

function pickMessage(excludeText) {
  const pool = MASCOT_MESSAGES.filter((m) => m.text !== excludeText);
  const list = pool.length > 0 ? pool : MASCOT_MESSAGES;
  return list[Math.floor(Math.random() * list.length)];
}

export default function Mascot() {
  const pathname = usePathname();
  const [mood, setMood] = useState("default");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(MASCOT_IMAGES.default);
  const [visible, setVisible] = useState(true);
  const fadeTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, []);

  function swapTo(nextMood) {
    setVisible(false);
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    fadeTimeout.current = setTimeout(() => {
      setMood(nextMood);
      setImgSrc(MASCOT_IMAGES[nextMood] ?? MASCOT_IMAGES.default);
      setVisible(true);
    }, 150);
  }

  function handleMascotClick() {
    const picked = pickMessage(message);
    setMessage(picked.text);
    setOpen(true);
    swapTo(picked.mood);
  }

  function handleClose() {
    setOpen(false);
    swapTo("default");
  }

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(e) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (HIDDEN_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end">
        {open && message && (
          <div
            className="relative mb-3 max-w-[260px] rounded-xl border border-border bg-card p-4 text-[15px] leading-[1.7] text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="말풍선 닫기"
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-xs text-muted"
            >
              ×
            </button>
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleMascotClick}
          aria-label="마스코트에게 말 걸기"
          className="transition-transform duration-150 hover:scale-105 focus-visible:scale-105 focus-visible:outline-none"
        >
          <div
            className={`relative h-[72px] w-[72px] transition-opacity duration-150 md:h-[100px] md:w-[100px] ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={imgSrc}
              alt={MASCOT_ALT[mood] ?? MASCOT_ALT.default}
              fill
              sizes="(min-width: 768px) 100px, 72px"
              className="object-contain"
              onError={() => setImgSrc(MASCOT_IMAGES.default)}
            />
          </div>
        </button>
      </div>
    </>
  );
}

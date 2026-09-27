"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// 메시지 + 표정 짝 — 여기에 추가/수정하면 됩니다.
const MASCOT_MESSAGES = [
  // default — 기본 미소
  { mood: "default", text: "실수해도 괜찮아. 처음부터 잘하는 사람은 없으니까!" },
  { mood: "default", text: "모든 순간을 완벽하게 해낼 필요는 없어." },
  { mood: "default", text: "오늘의 실수 하나가 너를 설명하는 건 아니야." },
  { mood: "default", text: "잘하지 못했어도 괜찮아. 해보려고 했던 마음도 소중해." },
  { mood: "default", text: "실패한 일이 있다고 해서 내가 실패한 사람인 건 아니야." },
  { mood: "default", text: "오늘만큼은 네 편을 들어줘도 괜찮아." },
  { mood: "default", text: "마음에 들지 않는 모습까지도 전부 나의 일부야." },
  { mood: "default", text: "잘한 게 하나도 없는 것 같은 날에도 네 가치는 달라지지 않아." },
  { mood: "default", text: "다른 사람과 비교하다 보면 내 속도를 놓치기 쉬워." },
  { mood: "default", text: "그때의 나도 나름의 이유와 마음이 있었을 거야." },
  { mood: "default", text: "아직 일어나지 않은 일을 지금 모두 해결할 필요는 없어." },
  { mood: "default", text: "지금 느끼는 감정도 계속 똑같이 머물러 있지는 않을 거야." },
  { mood: "default", text: "앞이 잘 안 보일 땐, 바로 다음 한 걸음만 봐도 괜찮아." },
  { mood: "default", text: "어떤 선택을 했든, 그때의 나는 나름대로 고민했을 거야." },
  { mood: "default", text: "좋은 모습만 내 모습인 건 아니야. 지금의 나도 나니까." },
  { mood: "default", text: "어떤 감정이 찾아와도 '그러면 안 돼'라고 밀어내지 않아도 돼." },

  // happy — 활짝 웃음
  { mood: "happy", text: "조금 서툴러도 괜찮아. 우리는 아직 오르는 중이니까! 🌱" },
  { mood: "happy", text: "오늘 하루도 여기까지 온 것만으로 충분해." },
  { mood: "happy", text: "적어도 오늘은 내가 내 편이 되어주자." },
  { mood: "happy", text: "멀리까지 한꺼번에 가지 않아도 돼. 오늘은 한 걸음만!" },
  { mood: "happy", text: "남들보다 천천히 가도 괜찮아. 중요한 건 내 방향이니까. 🌱" },
  { mood: "happy", text: "오늘은 나에게 조금 더 친절한 하루를 보내보자." },
  { mood: "happy", text: "오늘을 살아갈 나에게 미리 응원 한 번! 🙌" },
  { mood: "happy", text: "눈에 잘 보이지 않아도 우리는 조금씩 자라고 있어." },
  { mood: "happy", text: "다시 시작하고 싶다면, 언제든 다시 시작해도 돼." },
  { mood: "happy", text: "오늘도 네 곁에 있어준 너에게 고맙다고 말해주자." },

  // wink — 윙크
  { mood: "wink", text: "틀릴 수도 있지. 지금 배워가는 중인걸." },
  { mood: "wink", text: "오늘은 스스로에게 '그럴 수도 있지!'라고 말해주자." },
  { mood: "wink", text: "지친 나에게 따뜻한 차 한 잔 어때? ☕" },
  {
    mood: "wink",
    text: "마음속에서 나를 혼내는 목소리가 너무 커졌다면, 잠깐 볼륨을 낮춰보자.",
  },
  { mood: "wink", text: "오늘은 북한산이 얼마나 선명하려나~" },
  { mood: "wink", text: "우이천에서 산책이나 해볼까?" },

  // surprised — 놀란 얼굴
  { mood: "surprised", text: "다른 사람에게 그러듯, 나에게도 조금 너그러워져 볼까?" },
  { mood: "surprised", text: "다른 사람을 챙기듯 오늘은 네 마음도 한번 챙겨볼까?" },
  { mood: "surprised", text: "친한 친구에게 말하듯, 나에게도 다정하게 말해볼까?" },
  { mood: "surprised", text: "예전의 나에게 한마디 건넨다면, 뭐라고 말해주고 싶어?" },
  { mood: "surprised", text: "내가 바꿀 수 없는 것까지 붙잡고 있지는 않은지 살펴볼까?" },
  { mood: "surprised", text: "오늘 내 마음은 어떤지 잠깐 물어봐 줄래?" },
  { mood: "surprised", text: "오늘 덕조는 어디에 있을까?" },

  // sad — 눈물
  { mood: "sad", text: "모든 일이 다 네 책임은 아니야. 혼자 짊어지지 않아도 돼." },
  { mood: "sad", text: "힘들면 힘들다고 말해도 돼. 늘 괜찮은 척하지 않아도 돼." },
  { mood: "sad", text: "마음이 힘들다고 말하고 있다면, 잠깐 귀 기울여줘." },
  { mood: "sad", text: "그 짐, 잠깐 내려놓아도 괜찮아. 전부 혼자 들 필요는 없어." },
  { mood: "sad", text: "다른 사람의 기준으로 너를 너무 다그치지 않았으면 좋겠어." },
  { mood: "sad", text: "불안하구나. 그런 마음이 드는 것도 자연스러워." },
  { mood: "sad", text: "어려운 순간을 지나고 있는 나를 너무 다그치지 말자." },
  { mood: "sad", text: "불안한 나에게 '왜 이래?' 대신 '많이 걱정되는구나'라고 말해줘." },
  { mood: "sad", text: "오늘 들었던 아픈 말을 계속 마음속에서 반복하지 않아도 괜찮아." },

  // tired — 시무룩
  { mood: "tired", text: "많이 지쳤구나. 여기까지 오느라 애썼어." },
  { mood: "tired", text: "잠깐 쉬어가도 괜찮아. 멈추는 것도 걷는 과정이니까." },
  { mood: "tired", text: "아무것도 하지 않고 쉬는 시간도 필요해." },
  { mood: "tired", text: "오늘은 조금 덜 애써도 괜찮아." },
  { mood: "tired", text: "오늘 밤만큼은 마음 편히 푹 쉬었으면 좋겠다. 🌙" },
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
            className="relative mb-3 max-w-[280px] rounded-xl border border-border bg-card p-4 text-[15px] leading-[1.7] text-foreground"
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

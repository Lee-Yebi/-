"use client";

import { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { FlowerDivider } from "@/components/Deco";
import RoomBackground, { Window } from "@/components/RoomBackground";
import { TEAM } from "@/data/team";

const LOGO_MAX_WIDTH_CLASS = "max-w-[1000px]";

const entryCards = [
  {
    title: "마음 관리",
    desc: "지금 내 마음 상태를 살펴보고 싶다면",
    href: "/mind-care",
  },
  {
    title: "학생상담센터 안내",
    desc: "어떤 도움을 받을 수 있는지 알아봐요",
    href: "/counsel",
  },
  {
    title: "이용후기",
    desc: "먼저 상담센터를 이용한 덕우들의 이야기",
    href: "/reviews",
  },
  {
    title: "교외 도움 찾기",
    desc: "학교 밖에서도 도움받을 수 있어요",
    href: "/external",
  },
];

export default function Home() {
  const [logoError, setLogoError] = useState(false);
  const [teamMascotError, setTeamMascotError] = useState(false);

  return (
    <div className="brand-scope min-h-screen w-full">
      <RoomBackground>
        <div className="room__logo">
          <div className={`mx-auto w-full px-4 ${LOGO_MAX_WIDTH_CLASS}`}>
            {logoError ? (
              <p className="text-center text-[28px] font-bold text-moss">무궁담</p>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/main_logo_final_cropped.png"
                alt="무궁담 - 마음을 마주하는 이야기"
                onError={() => setLogoError(true)}
                className="block aspect-[1821/419] w-full h-auto"
              />
            )}
          </div>
        </div>

        <Window>
          <h1 className="text-center text-[28px] leading-snug font-bold text-[#3C5233] break-keep">
            마음의 도움이 필요할 때, 어디로 가야 할까요?
          </h1>
          <p className="mt-2 text-center text-base text-[#5E5450]">
            학생의 눈높이에서 교내·외 마음건강 정보를 한곳에 모았습니다.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
            {entryCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group relative block rounded-2xl border border-sprout bg-card p-6 transition-colors duration-150 ease-[ease] hover:border-leaf hover:bg-blush/30 focus-visible:border-leaf focus-visible:bg-blush/30 focus-visible:outline-none active:bg-blush/30"
              >
                <h2 className="text-lg font-bold text-moss transition-colors duration-150 ease-[ease] group-hover:text-moss-deep group-focus-visible:text-moss-deep">
                  {card.title}
                </h2>
                <p className="mt-1.5 text-sm text-text-sub">{card.desc}</p>
                <span
                  aria-hidden
                  className="absolute right-6 bottom-6 text-[16px] text-sprout transition-all duration-150 ease-[ease] group-hover:translate-x-[3px] group-hover:text-moss group-focus-visible:translate-x-[3px] group-focus-visible:text-moss"
                >
                  ›
                </span>
              </Link>
            ))}
          </div>

          <FlowerDivider className="mt-6" />

          <Link
            href="/about"
            className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-maroon/20 bg-blush p-5 text-center sm:flex-row sm:text-left"
          >
            {!teamMascotError && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/oreumi_wave.png"
                alt={TEAM.mascot.name}
                onError={() => setTeamMascotError(true)}
                className="h-auto w-[56px] shrink-0 object-contain"
              />
            )}
            <div>
              <p className="text-[15px] font-bold text-maroon">
                무궁담을 만든 DPSY:ON을 소개합니다
              </p>
              <p className="mt-1 text-[14px] text-maroon">
                우리가 모인 이유와 만들고 싶은 변화를 들려드릴게요.
              </p>
            </div>
          </Link>
        </Window>
      </RoomBackground>
    </div>
  );
}

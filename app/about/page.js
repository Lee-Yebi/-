"use client";

import { useState } from "react";
import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import { TEAM } from "@/data/team";

const LEFT_COL = "w-24 shrink-0 md:w-28";

export default function AboutPage() {
  const [mascotImgError, setMascotImgError] = useState(false);

  return (
    <PageContainer>
      {/* 팀 이름 + 소개 */}
      <h1 className="text-[28px] font-semibold text-accent">{TEAM.name}</h1>
      {TEAM.intro.length > 0 && (
        <div className="mt-3 max-w-[620px] space-y-3">
          {TEAM.intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* 팀명 뜻 */}
      {TEAM.nameMeaning?.lines?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-base font-semibold text-foreground">팀명 뜻</h2>
          <div className="mt-4 rounded-xl border border-border bg-card p-[18px]">
            <div className="space-y-3">
              {TEAM.nameMeaning.lines.map((line) => (
                <div key={line.en} className="flex items-start">
                  <div className={`${LEFT_COL} pr-4 text-[16px] font-semibold text-accent`}>
                    {line.en}
                  </div>
                  <div className="border-l border-border pl-4 text-[15px] text-foreground">
                    {line.ko}
                  </div>
                </div>
              ))}
            </div>

            {TEAM.nameMeaning.slogan && (
              <div className="mt-4 border-t border-border pt-[18px] pb-[18px] text-center">
                <p className="text-[18px] font-semibold text-accent">
                  {TEAM.nameMeaning.slogan}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 무궁담이라는 이름 */}
      {TEAM.siteNameMeaning && (
        <section className="mt-10">
          <div className="rounded-xl border border-border bg-card p-[18px]">
            <h2 className="text-base font-semibold text-foreground">무궁담이라는 이름</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {TEAM.siteNameMeaning}
            </p>
          </div>
        </section>
      )}

      {/* 팀 목표 */}
      {TEAM.goals.length > 0 && (
        <section className="mt-10">
          <h2 className="text-base font-semibold text-foreground">팀 목표</h2>
          <div className="mt-4 space-y-[10px]">
            {TEAM.goals.map((goal) => (
              <div
                key={goal.en}
                className="flex items-start rounded-xl border border-border bg-card p-[18px]"
              >
                <div className={`${LEFT_COL} flex justify-center pr-4`}>
                  <span className="rounded-[20px] bg-highlight px-3 py-1 text-center text-[13px] font-medium text-highlight-foreground">
                    {goal.en}
                  </span>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-foreground">{goal.ko}</p>
                  <p className="mt-1 text-[15px] text-muted">{goal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 팀원 소개 */}
      {TEAM.members.length > 0 && (
        <section className="mt-10">
          <h2 className="text-base font-semibold text-foreground">팀원 소개</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {TEAM.members.map((member) => (
              <div
                key={member.name}
                className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-[18px]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-highlight text-[18px] font-semibold text-accent">
                  {member.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-foreground">{member.name}</p>
                  {(member.major || member.year) && (
                    <p className="mt-1 text-[14px] text-muted">
                      {[member.major, member.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {member.role && (
                    <span className="mt-2 inline-block rounded-[20px] bg-highlight px-3 py-1 text-[13px] font-medium text-highlight-foreground">
                      {member.role}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 마스코트 */}
      <section className="mt-10">
        <h2 className="text-base font-semibold text-foreground">마스코트 {TEAM.mascot.name}</h2>
        <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-5 text-center md:flex-row md:items-start md:text-left">
          {!mascotImgError && (
            <Image
              src={TEAM.mascot.image}
              alt={TEAM.mascot.name}
              width={120}
              height={120}
              className="shrink-0 object-contain"
              onError={() => setMascotImgError(true)}
            />
          )}
          <div>
            <p className="text-base font-semibold text-foreground">{TEAM.mascot.name}</p>
            {TEAM.mascot.description && (
              <p className="mt-1 text-sm leading-relaxed text-muted">{TEAM.mascot.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* 활동 연혁 */}
      {TEAM.history.length > 0 && (
        <section className="mt-10">
          <h2 className="text-base font-semibold text-foreground">활동 연혁</h2>
          <ol className="relative mt-4 space-y-6 border-l-2 border-border py-1 pl-5">
            {TEAM.history.map((item) => (
              <li key={`${item.date}-${item.title}`} className="relative">
                <span className="absolute top-1.5 -left-[25px] h-2 w-2 rounded-full bg-border" />
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <p className="shrink-0 text-[14px] text-muted sm:w-24">{item.date}</p>
                  <div>
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    {item.desc && (
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 인스타그램 */}
      {TEAM.instagram && (
        <a
          href={TEAM.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex min-h-11 w-full items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-2"
        >
          인스타그램 보러 가기
        </a>
      )}
    </PageContainer>
  );
}

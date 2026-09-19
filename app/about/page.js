"use client";

import { useState } from "react";
import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import { TEAM } from "@/data/team";

export default function AboutPage() {
  const [mascotImgError, setMascotImgError] = useState(false);

  const hasMeaningCards = Boolean(TEAM.nameMeaning || TEAM.siteNameMeaning);

  return (
    <PageContainer>
      {/* 1. 팀 이름과 한 줄 소개 */}
      <h1 className="text-[28px] font-semibold text-accent">{TEAM.name}</h1>
      {TEAM.tagline && <p className="mt-2 text-base text-muted">{TEAM.tagline}</p>}

      {/* 2. 팀명 뜻 / 무궁담이라는 이름 */}
      {hasMeaningCards && (
        <section className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          {TEAM.nameMeaning && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-base font-semibold text-foreground">팀명 뜻</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{TEAM.nameMeaning}</p>
            </div>
          )}
          {TEAM.siteNameMeaning && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-base font-semibold text-foreground">무궁담이라는 이름</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{TEAM.siteNameMeaning}</p>
            </div>
          )}
        </section>
      )}

      {/* 3. 우리가 하려는 일 */}
      {TEAM.goals.length > 0 && (
        <section className="mt-10">
          <h2 className="text-base font-semibold text-foreground">우리가 하려는 일</h2>
          <ul className="mt-4 space-y-2 rounded-xl border border-border bg-card p-5">
            {TEAM.goals.map((goal) => (
              <li key={goal} className="text-sm leading-relaxed text-muted">
                · {goal}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. 팀원 소개 */}
      {TEAM.members.length > 0 && (
        <section className="mt-10">
          <h2 className="text-base font-semibold text-foreground">팀원 소개</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {TEAM.members.map((member) => (
              <div key={member.name} className="rounded-xl border border-border bg-card p-5">
                <p className="text-[16px] font-semibold text-foreground">{member.name}</p>
                {(member.major || member.studentYear) && (
                  <p className="mt-1 text-[14px] text-muted">
                    {[member.major, member.studentYear].filter(Boolean).join(" · ")}
                  </p>
                )}
                {member.role && (
                  <span className="mt-3 inline-block rounded-full bg-highlight px-3 py-1 text-xs font-medium text-highlight-foreground">
                    {member.role}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. 마스코트 */}
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

      {/* 6. 활동 연혁 */}
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
                    {item.description && (
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 7. 인스타그램 */}
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

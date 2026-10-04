"use client";

import { useState } from "react";
import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import DecoImage from "@/components/Deco";
import { TEAM } from "@/data/team";

const LEFT_COL = "w-24 shrink-0 md:w-28";

export default function AboutPage() {
  const [mascotImgError, setMascotImgError] = useState(false);

  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
      {/* 팀 이름 + 소개 */}
      <div className="flex max-w-[620px] items-center gap-3">
        <h1 className="shrink-0 text-[28px] font-bold text-moss">{TEAM.name}</h1>
        <DecoImage src="/oreumi_hooray.png" className="ml-auto hidden w-[110px] shrink-0 sm:block" />
      </div>
      {TEAM.intro.length > 0 && (
        <div className="mt-3 max-w-[620px] space-y-3">
          {TEAM.intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-text-sub">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* 인스타그램 */}
      {TEAM.instagram && (
        <a
          href={TEAM.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[20px] inline-flex min-h-11 items-center justify-center rounded-2xl bg-moss-deep px-5 text-sm font-normal text-white transition-opacity hover:opacity-90"
        >
          인스타그램 보러 가기
        </a>
      )}

      {/* 팀명 뜻 */}
      {TEAM.nameMeaning?.lines?.length > 0 && (
        <section className="mt-8">
          <h2 className="text-base font-bold text-text">팀명 뜻</h2>
          <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-card p-[18px]">
            <div className="space-y-3">
              {TEAM.nameMeaning.lines.map((line) => (
                <div key={line.en} className="flex items-start">
                  <div className={`${LEFT_COL} pr-4 text-[16px] font-bold text-moss`}>
                    {line.en}
                  </div>
                  <div className="border-l border-[var(--color-border)] pl-4 text-[15px] text-text">
                    {line.ko}
                  </div>
                </div>
              ))}
            </div>

            {TEAM.nameMeaning.slogan && (
              <div className="mt-4 border-t border-[var(--color-border)] pt-[18px] pb-[18px] text-center">
                <p className="text-[18px] font-bold text-moss">
                  {TEAM.nameMeaning.slogan}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 무궁담이라는 이름 */}
      {TEAM.siteNameMeaning && (
        <section className="mt-[60px]">
          <div className="rounded-2xl border border-[var(--color-border)] bg-card p-[18px]">
            <h2 className="flex items-center gap-2 text-base font-bold text-text">
              <DecoImage src="/heart_puzzle.png" className="w-7 shrink-0" />
              왜 &apos;무궁담&apos;일까요?
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-text-sub">
              {TEAM.siteNameMeaning}
            </p>
          </div>
        </section>
      )}

      {/* 팀 목표 */}
      {TEAM.goals.length > 0 && (
        <section className="mt-[60px]">
          <h2 className="relative text-base font-bold text-text sm:pl-20">
            <DecoImage
              src="/oreumi_cheer.png"
              className="absolute top-0 left-0 hidden w-[72px] sm:block"
            />
            팀 목표
          </h2>
          <div className="mt-4 space-y-[10px] sm:mt-20">
            {TEAM.goals.map((goal) => (
              <div
                key={goal.en}
                className="flex items-start rounded-2xl border border-[var(--color-border)] bg-card p-[18px]"
              >
                <div className={`${LEFT_COL} flex justify-center pr-4`}>
                  <span className="rounded-[20px] bg-blush px-3 py-1 text-center text-[13px] font-normal text-maroon">
                    {goal.en}
                  </span>
                </div>
                <div>
                  <p className="text-[16px] font-bold text-text">{goal.ko}</p>
                  <p className="mt-1 text-[15px] text-text-sub">{goal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 팀원 소개 */}
      {TEAM.members.length > 0 && (
        <section className="mt-[60px]">
          <h2 className="flex items-center gap-2 text-base font-bold text-text">
            <DecoImage src="/oreumi_hiking_wink.png" className="hidden w-14 shrink-0 sm:block" />
            팀원 소개
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {TEAM.members.map((member, i) => (
              <div
                key={member.name}
                className="flex h-full items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-card p-[18px]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush">
                  <DecoImage
                    src={i % 2 === 0 ? "/heart_puzzle.png" : "/flower_hibiscus.png"}
                    className="w-7"
                  />
                </div>
                <div>
                  <p className="text-[16px] font-bold text-text">{member.name}</p>
                  {(member.major || member.year) && (
                    <p className="mt-1 text-[14px] text-text-sub">
                      {[member.major, member.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {member.role && (
                    <span className="mt-2 inline-block rounded-[20px] bg-blush px-3 py-1 text-[13px] font-normal text-maroon">
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
      <section className="mt-[60px]">
        <h2 className="text-base font-bold text-text">마스코트 {TEAM.mascot.name}</h2>
        <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-card p-6 text-center md:flex-row md:items-start md:text-left">
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
            <p className="text-base font-bold text-text">{TEAM.mascot.name}</p>
            {TEAM.mascot.description && (
              <p className="mt-1 text-sm leading-relaxed text-text-sub">{TEAM.mascot.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* 활동 연혁 */}
      {TEAM.history.length > 0 && (
        <section className="mt-[60px]">
          <h2 className="flex items-center gap-2 text-base font-bold text-text">
            <DecoImage src="/oreumi_hiking_right.png" className="w-14 shrink-0" />
            활동 연혁
          </h2>
          <ol className="relative mt-4 space-y-6 border-l-2 border-[var(--color-border)] py-1 pl-5">
            {TEAM.history.map((item) => (
              <li key={`${item.date}-${item.title}`} className="relative">
                <span className="absolute top-1.5 -left-[25px] h-2 w-2 rounded-full bg-[var(--color-border)]" />
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <p className="shrink-0 text-[14px] text-text-sub sm:w-24">{item.date}</p>
                  <div>
                    <p className="text-base font-bold text-text">{item.title}</p>
                    {item.desc && (
                      <p className="mt-1 text-sm leading-relaxed text-text-sub">{item.desc}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 함께한 곳 */}
      <section className="mt-[60px]">
        <h2 className="text-base font-bold text-text">함께한 곳</h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-card p-[18px]">
            <span className="inline-block rounded-[20px] bg-blush px-3 py-1 text-[13px] font-normal text-maroon">
              정보 제공 협력
            </span>
            <p className="mt-2 text-[16px] font-bold text-text">덕성여자대학교 학생상담센터</p>
            <p className="mt-1 text-[15px] leading-relaxed text-text-sub">
              무궁담의 학생상담센터 이용 안내, 자주 묻는 질문 등 상담 관련 정보는 학생상담센터의
              자문과 정보 제공을 바탕으로 제작되었습니다.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-card p-[18px]">
            <span className="inline-block rounded-[20px] bg-blush px-3 py-1 text-[13px] font-normal text-maroon">
              주관
            </span>
            <p className="mt-2 text-[16px] font-bold text-text">
              보건복지부{" "}
              <a
                href="https://www.instagram.com/ncmh_kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-moss-deep underline underline-offset-2 hover:opacity-80"
              >
                국립정신건강센터
              </a>
              {" · "}
              <a
                href="https://www.instagram.com/mental_health_korea"
                target="_blank"
                rel="noopener noreferrer"
                className="text-moss-deep underline underline-offset-2 hover:opacity-80"
              >
                멘탈헬스코리아
              </a>
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-text-sub">
              영마인드링크 3기 청년 정신건강 서포터즈 활동의 일환으로 제작되었습니다.
            </p>
          </div>
        </div>
      </section>

      <DecoImage src="/oreumi_bow.png" className="mx-auto mt-[40px] block w-[90px]" />
      </PageContainer>
    </div>
  );
}

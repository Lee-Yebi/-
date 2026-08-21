"use client";

import { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

const topics = ["우울", "불안", "외로움", "스트레스", "대인관계", "진로"];

const subTabs = [
  { key: "state", label: "이런 상태예요" },
  { key: "coping", label: "이렇게 해보세요" },
];

const stateAreas = ["정서", "생각", "행동", "수면", "몸의 변화"];

const copingGroups = ["생각 다루기", "행동으로 움직이기", "몸 돌보기"];

export default function MindCarePage() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [subTab, setSubTab] = useState("state");

  return (
    <PageContainer>
      <h1 className="text-xl font-semibold">마음 관리</h1>

      {/* topic tabs */}
      <div className="mt-6 overflow-x-auto">
        <div className="flex gap-6 border-b border-border">
          {topics.map((topic, i) => (
            <button
              key={topic}
              type="button"
              onClick={() => setTopicIndex(i)}
              className={`shrink-0 border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                i === topicIndex
                  ? "border-accent text-accent"
                  : "border-transparent text-muted"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* state / coping sub-tabs */}
      <div className="mt-5 flex gap-6 border-b border-border">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setSubTab(tab.key)}
            className={`min-h-11 border-b-2 px-1 text-sm font-medium transition-colors ${
              subTab === tab.key
                ? "border-accent text-accent"
                : "border-transparent text-muted"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="mt-6">
        {subTab === "state" ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {stateAreas.map((area) => (
              <div key={area} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-base font-semibold text-foreground">{area}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">[내용 준비 중]</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {copingGroups.map((group) => (
              <section key={group}>
                <h3 className="text-base font-semibold text-foreground">{group}</h3>
                <div className="mt-3 rounded-xl border border-border bg-card p-5">
                  <p className="text-sm font-semibold text-foreground">[내용 준비 중]</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">[내용 준비 중]</p>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* common CTA */}
      <div className="mt-10 border-t border-border pt-8 text-center">
        <p className="text-sm text-muted">혼자 해결이 어렵다면 상담을 신청해보세요</p>
        <Link
          href="/counsel/apply"
          className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-2"
        >
          상담 신청하기
        </Link>
      </div>
    </PageContainer>
  );
}

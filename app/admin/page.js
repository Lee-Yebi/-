"use client";

import { useCallback, useEffect, useState } from "react";
import PageContainer from "@/components/PageContainer";
import { supabase } from "@/lib/supabaseClient";

const tabs = [
  { key: "pending", label: "대기 중" },
  { key: "approved", label: "승인됨" },
  { key: "rejected", label: "거절됨" },
];

function formatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export default function AdminPage() {
  // undefined = 세션 확인 중, null = 로그아웃 상태, 객체 = 로그인됨
  const [session, setSession] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState("pending");
  const [reviews, setReviews] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [listError, setListError] = useState("");
  const [actioningId, setActioningId] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const loadReviews = useCallback(async () => {
    if (!supabase || !session) return;
    setLoadingReviews(true);
    setListError("");

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", activeTab)
      .order("created_at", { ascending: false });

    if (error) {
      setListError("목록을 불러오지 못했습니다.");
    } else {
      setReviews(data ?? []);
    }
    setLoadingReviews(false);
  }, [activeTab, session]);

  const loadPendingCount = useCallback(async () => {
    if (!supabase || !session) return;
    const { count } = await supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending");
    setPendingCount(count ?? 0);
  }, [session]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  useEffect(() => {
    loadPendingCount();
  }, [loadPendingCount]);

  async function handleLogin(e) {
    e.preventDefault();
    if (!supabase) {
      setLoginError("로그인 기능이 아직 설정되지 않았습니다.");
      return;
    }
    setLoggingIn(true);
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoggingIn(false);
    if (error) {
      setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  }

  async function handleLogout() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  async function updateStatus(id, nextStatus, confirmMessage) {
    if (!window.confirm(confirmMessage)) return;
    if (!supabase) return;

    setActioningId(id);

    const patch = { status: nextStatus };
    if (nextStatus === "approved") {
      patch.approved_at = new Date().toISOString();
    }
    if (nextStatus === "pending") {
      patch.approved_at = null;
    }

    const { error } = await supabase.from("reviews").update(patch).eq("id", id);

    setActioningId(null);

    if (error) {
      window.alert("처리하지 못했습니다. 다시 시도해주세요.");
      return;
    }

    loadReviews();
    loadPendingCount();
  }

  // 세션 확인 중 — 아무것도 보여주지 않음
  if (session === undefined) {
    return <PageContainer />;
  }

  // 로그인 안 됨 — 로그인 폼만
  if (!session) {
    return (
      <div className="brand-scope min-h-screen w-full bg-cream">
      <PageContainer>
        <h1 className="text-xl font-semibold text-moss">관리자 로그인</h1>

        <form className="mt-9 max-w-sm" onSubmit={handleLogin}>
          <label htmlFor="admin-email" className="block text-sm font-medium text-text">
            이메일
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-card p-3 text-sm text-text focus:border-moss focus:outline-none"
          />

          <label
            htmlFor="admin-password"
            className="mt-4 block text-sm font-medium text-text"
          >
            비밀번호
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-card p-3 text-sm text-text focus:border-moss focus:outline-none"
          />

          {loginError && <p className="mt-3 text-sm font-medium text-maroon">{loginError}</p>}

          <button
            type="submit"
            disabled={loggingIn}
            className="mt-9 flex min-h-11 w-full items-center justify-center rounded-2xl bg-moss-deep px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loggingIn ? "로그인 중…" : "로그인"}
          </button>
        </form>
      </PageContainer>
      </div>
    );
  }

  // 로그인됨 — 승인 화면
  return (
    <div className="brand-scope min-h-screen w-full bg-cream">
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-moss">관리자</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-11 items-center rounded-full border border-[var(--color-border)] bg-card px-4 text-sm font-medium text-text-sub"
        >
          로그아웃
        </button>
      </div>

      <details className="group mt-9 rounded-2xl border border-[var(--color-border)] bg-card">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-text marker:content-none">
          승인 기준
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 shrink-0 text-text-sub transition-transform group-open:rotate-180"
          >
            <path d="M5 7.5 L10 12.5 L15 7.5" />
          </svg>
        </summary>
        <div className="border-t border-[var(--color-border)] px-5 py-4 text-sm leading-relaxed text-text-sub">
          <p className="font-medium text-text">다음은 승인하지 않습니다.</p>
          <ul className="mt-2 space-y-1">
            <li>· 특정 상담사나 학생을 알아볼 수 있는 내용</li>
            <li>· 욕설, 비방, 명예훼손</li>
            <li>· 자살·자해의 수단이나 방법이 구체적으로 적힌 내용</li>
            <li>· 광고, 스팸</li>
          </ul>
        </div>
      </details>

      <div className="mt-9 overflow-x-auto">
        <div className="flex gap-6 border-b border-[var(--color-border)]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex shrink-0 items-center gap-1.5 border-b-2 px-1 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "border-moss text-moss"
                  : "border-transparent text-text-sub"
              }`}
            >
              {tab.label}
              {tab.key === "pending" && pendingCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-moss-deep px-1 text-xs font-semibold text-white">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-9 space-y-3">
        {loadingReviews && <p className="text-sm text-text-sub">불러오는 중…</p>}

        {!loadingReviews && listError && (
          <p className="text-sm font-medium text-maroon">{listError}</p>
        )}

        {!loadingReviews && !listError && reviews.length === 0 && (
          <p className="rounded-2xl border border-[var(--color-border)] bg-card p-6 text-center text-sm text-text-sub">
            해당하는 후기가 없습니다
          </p>
        )}

        {!loadingReviews &&
          !listError &&
          reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-[var(--color-border)] bg-card p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-maroon">
                  {review.category}
                </span>
                <span className="text-xs text-[#8C8087]">
                  {formatDateTime(review.created_at)}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-text">
                {review.content}
              </p>

              <div className="mt-4 flex gap-2">
                {activeTab === "pending" && (
                  <>
                    <button
                      type="button"
                      disabled={actioningId === review.id}
                      onClick={() => updateStatus(review.id, "approved", "이 후기를 승인할까요?")}
                      className="flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-moss-deep px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                    >
                      승인
                    </button>
                    <button
                      type="button"
                      disabled={actioningId === review.id}
                      onClick={() => updateStatus(review.id, "rejected", "이 후기를 거절할까요?")}
                      className="flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-card px-4 text-sm font-medium text-text-sub transition-colors disabled:opacity-40"
                    >
                      거절
                    </button>
                  </>
                )}

                {activeTab === "approved" && (
                  <button
                    type="button"
                    disabled={actioningId === review.id}
                    onClick={() =>
                      updateStatus(review.id, "pending", "승인을 취소하고 대기 중으로 되돌릴까요?")
                    }
                    className="flex min-h-11 w-full items-center justify-center rounded-2xl border border-[var(--color-border)] bg-card px-4 text-sm font-medium text-text-sub transition-colors disabled:opacity-40"
                  >
                    승인 취소
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </PageContainer>
    </div>
  );
}

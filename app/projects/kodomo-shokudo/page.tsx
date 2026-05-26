"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const SIGNUP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfIXJH1vRTMVPJCR3Uf8rTwVdlOKy67_svBWsG6KXMAryQfxg/viewform?usp=header";
const SCROLL_STORAGE_KEY = "kodomo-shokudo-scroll-y";

const faqs = [
  {
    q: "子どもだけで参加できますか？",
    a: "はい、お子さんだけでのご参加も大歓迎です。当日はスタッフが常時おり、安心して過ごせる環境を整えています。初めての方は受付で声をかけてください。",
  },
  {
    q: "参加費はかかりますか？",
    a: "子どもは無料、大人の方は200円（実費）をいただいております。経済的な事情がある場合はお気軽にスタッフへご相談ください。",
  },
  {
    q: "食物アレルギーへの対応はしていますか？",
    a: "主要なアレルゲン（卵・乳・小麦・そば・落花生・えび・かに）については事前申告制で対応しています。申し込みフォームまたは当日受付でお知らせください。",
  },
  {
    q: "ボランティアに参加するのに経験は必要ですか？",
    a: "経験は一切不要です。調理補助・受付・子どもたちと遊ぶ係など、得意なことで参加できます。初回は先輩スタッフが丁寧にサポートします。",
  },
];

const sponsors = [
  { name: "〇〇市社会福祉協議会" },
  { name: "〇〇農業協同組合" },
  { name: "株式会社〇〇フード" },
  { name: "〇〇地域振興財団" },
];

const galleryImages = [
  { src: "/images/project-1-kids-cafeteria.png", alt: "子ども食堂の活動風景 1" },
  { src: "/images/project-2-kitchen-car.png", alt: "子ども食堂の活動風景 2" },
  { src: "/images/project-3-coming-soon.png", alt: "子ども食堂の活動風景 3" },
  { src: "/images/project-4-coming-soon.png", alt: "子ども食堂の活動風景 4" },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-orange-50"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold leading-relaxed text-stone-800 sm:text-base">
          {q}
        </span>
        <span
          className={`shrink-0 text-orange-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-orange-50 px-6 pb-5 text-sm leading-relaxed text-stone-600 sm:text-base">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  title,
  sub,
}: {
  icon: string;
  label: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
      <div className="shrink-0 rounded-xl bg-orange-100 p-3 text-2xl">{icon}</div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
          {label}
        </p>
        <p className="text-lg font-bold text-stone-800">{title}</p>
        {sub ? <p className="mt-0.5 text-sm text-stone-500">{sub}</p> : null}
      </div>
    </div>
  );
}

function PlaceholderButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      title="リンク準備中"
      className={className}
    >
      {children}
    </button>
  );
}

export default function KodomoShokudoPage() {
  const saveScrollPosition = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.sessionStorage.setItem(SCROLL_STORAGE_KEY, String(window.scrollY));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const restoreScrollPosition = () => {
      const saved = window.sessionStorage.getItem(SCROLL_STORAGE_KEY);

      if (!saved) {
        return;
      }

      const top = Number(saved);

      if (!Number.isFinite(top)) {
        return;
      }

      window.requestAnimationFrame(() => {
        window.scrollTo({ top, behavior: "auto" });
      });
    };

    const blurActiveElement = () => {
      const activeElement = document.activeElement;

      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    };

    const handlePageShow = () => {
      blurActiveElement();
      restoreScrollPosition();
    };

    const handlePageHide = () => {
      saveScrollPosition();
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [saveScrollPosition]);

  const openSignupForm = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    saveScrollPosition();

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    const popup = window.open(SIGNUP_FORM_URL, "_blank", "noopener,noreferrer");

    if (!popup) {
      window.location.assign(SIGNUP_FORM_URL);
    }
  }, [saveScrollPosition]);

  return (
    <main className="min-h-screen bg-[#FFFBF5] font-sans text-stone-800">
      <section className="relative flex min-h-[560px] h-[92vh] items-end overflow-hidden pb-16 sm:pb-24">
        <Image
          src="/images/kodomo-shokudo-hero-logo.png"
          alt="子ども食堂の活動の様子"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span>🍽️</span>
            学生団体 〇〇大学 食のひろば
          </span>

          <h1 className="mb-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            子ども食堂
            <br />
            <span className="text-orange-400">プロジェクト</span>
          </h1>

          <p className="max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-xl">
            「ただいま」と言える場所を、地域の食卓から。
            <br className="hidden sm:block" />
            子どもも大人も、みんなで囲む温かいごはんを届けます。
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="h-12 w-full fill-[#FFFBF5] sm:h-16"
          >
            <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="mb-10 flex items-center gap-3">
          <span className="block h-10 w-2 rounded-full bg-orange-500" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Next Event
            </p>
            <h2 className="text-2xl font-black text-stone-800 sm:text-3xl">
              次回の開催予定
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-orange-100">
            <Image
              src="/images/vision-image.png"
              alt="次回開催チラシ"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="flex flex-col gap-5">
            <InfoCard
              icon="📅"
              label="日時"
              title="2025年8月10日（日）"
              sub="11:00〜14:00（受付 10:45〜）"
            />
            <InfoCard
              icon="📍"
              label="場所"
              title="〇〇市民センター 調理室"
              sub="〒000-0000 〇〇県〇〇市〇〇町1-2-3"
            />
            <InfoCard
              icon="👥"
              label="対象・定員"
              title="0歳〜18歳のお子さんと保護者"
              sub="定員：30名（先着順）"
            />

            <div className="flex items-center gap-4 rounded-2xl bg-orange-500 p-6 text-white">
              <span className="shrink-0 text-3xl">🍛</span>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-orange-200">
                  料金
                </p>
                <p className="text-2xl font-black">子ども 無料 ／ 大人 200円</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-orange-100 shadow-sm">
              <p className="bg-orange-50 py-2 text-center text-xs font-semibold tracking-wide text-stone-400">
                📍 アクセスマップ
              </p>
              <div className="flex h-52 items-center justify-center bg-stone-100">
                <p className="text-sm text-stone-400">ここにGoogleマップを埋め込んでください</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-orange-500 to-amber-500 px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-3xl font-black text-white sm:text-4xl">
            一緒に食卓を囲みませんか？
          </h2>
          <p className="mb-10 text-base leading-relaxed text-orange-100 sm:text-lg">
            参加もボランティアも、あなたの一歩が地域の子どもたちの笑顔になります。
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={openSignupForm}
              className="inline-flex touch-manipulation items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-black text-orange-600 shadow-lg shadow-orange-700/30 transition-all duration-200 active:translate-y-0 sm:text-lg"
            >
              <span>❤️</span>
              参加を申し込む
              <span>↗</span>
            </button>

            <PlaceholderButton
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border-2 border-white/40 bg-white/15 px-8 py-4 text-base font-black text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/25 active:translate-y-0 sm:text-lg"
            >
              <span>🤝</span>
              ボランティアに参加
              <span>↗</span>
            </PlaceholderButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="block h-10 w-2 rounded-full bg-orange-500" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
                Gallery
              </p>
              <h2 className="text-2xl font-black text-stone-800 sm:text-3xl">
                過去の活動の様子
              </h2>
            </div>
          </div>

          <PlaceholderButton
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-5 py-2.5 text-sm font-bold text-stone-600 transition-colors hover:border-orange-400 hover:text-orange-500"
          >
            <span className="mr-1">📸</span>
            公式Instagramを見る
            <span>↗</span>
          </PlaceholderButton>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 hover:bg-black/10" />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-orange-100 bg-amber-50 px-6 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-500">
              Supporters
            </p>
            <h2 className="mb-8 text-2xl font-black text-stone-800 sm:text-3xl">
              応援・後援いただいている皆さま
            </h2>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {sponsors.map((s, i) => (
                <div
                  key={i}
                  className="flex w-36 flex-col items-center justify-center gap-3 rounded-2xl border border-stone-100 bg-white px-6 py-5 shadow-sm transition-colors hover:border-orange-200 sm:w-40"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-lg font-black text-orange-500">
                    {s.name.slice(0, 1)}
                  </div>
                  <p className="text-center text-xs font-medium leading-snug text-stone-500">
                    {s.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-8 rounded-3xl border border-orange-100 bg-white p-8 shadow-sm sm:flex-row sm:p-10">
            <div className="self-start rounded-2xl bg-orange-100 p-4 text-3xl">🤲</div>
            <div className="flex-1">
              <h3 className="mb-3 text-xl font-black text-stone-800 sm:text-2xl">
                食材のご寄付・ご支援のお願い
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-stone-600 sm:text-base">
                地域の農家さんや企業さまからいただく野菜・米・加工品などが、子ども食堂の大切な食材となっています。
                「畑で余った野菜がある」「お米を提供したい」という方はぜひご連絡ください。小さなご支援が、子どもたちの笑顔につながります。
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PlaceholderButton
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                >
                  <span>❓</span>
                  寄付・支援のご相談はこちら
                </PlaceholderButton>
                <a
                  href="mailto:shokudo@example.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 px-6 py-3 text-sm font-bold text-stone-600 transition-colors hover:border-orange-400 hover:text-orange-500"
                >
                  📧 shokudo@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <div className="mb-10 flex items-center gap-3">
          <span className="block h-10 w-2 rounded-full bg-orange-500" />
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              FAQ
            </p>
            <h2 className="text-2xl font-black text-stone-800 sm:text-3xl">
              よくある質問
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-orange-100 bg-orange-50 p-8 text-center">
          <div className="mx-auto mb-3 text-3xl text-orange-400">✅</div>
          <p className="mb-1 font-semibold text-stone-700">その他のご質問は</p>
          <p className="mb-5 text-sm text-stone-500">
            公式Instagram の DM またはお問い合わせフォームからお気軽にどうぞ。
          </p>
          <PlaceholderButton
            className="inline-flex items-center gap-2 rounded-full border border-orange-300 px-6 py-2.5 text-sm font-bold text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
          >
            お問い合わせフォームへ
            <span>↗</span>
          </PlaceholderButton>
        </div>
      </section>

      <footer className="bg-stone-800 px-6 py-10 text-center text-sm text-stone-400 sm:px-10">
        <p className="mb-2 font-bold text-white">
          子ども食堂プロジェクト ／ 〇〇大学 食のひろば
        </p>
        <div className="mb-4 flex justify-center gap-5">
          <PlaceholderButton className="transition-colors hover:text-orange-400">
            Instagram
          </PlaceholderButton>
          <PlaceholderButton className="transition-colors hover:text-orange-400">
            LINE
          </PlaceholderButton>
          <PlaceholderButton className="transition-colors hover:text-orange-400">
            お問い合わせ
          </PlaceholderButton>
        </div>
        <p>© {new Date().getFullYear()} 〇〇大学 食のひろば. All rights reserved.</p>
      </footer>
    </main>
  );
}
 
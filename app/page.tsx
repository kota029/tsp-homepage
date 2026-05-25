"use client";

import Link from "next/link";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { siteData, type Project } from "@/config/siteData";

const BTN_PRIMARY =
  "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-md shadow-orange-200/60 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg hover:shadow-orange-300/50 transition-all duration-200";

/** 入場アニメーション（スマホでは globals.css で常に表示） */
const REVEAL = "animate-reveal transition-all duration-700";

function revealHidden(visible: boolean, hidden: string, shown: string) {
  return `${REVEAL} ${visible ? shown : hidden}`;
}

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function useInView(ref: React.RefObject<Element | null>, threshold = 0) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const markVisible = () => setVisible(true);

    const checkInViewport = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) markVisible();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) markVisible();
        }
      },
      { threshold: [0, threshold], rootMargin: "60px 0px" }
    );

    observer.observe(el);
    checkInViewport();
    requestAnimationFrame(checkInViewport);

    const onResize = () => checkInViewport();
    window.addEventListener("resize", onResize, { passive: true });

    const fallback = window.setTimeout(markVisible, 800);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(fallback);
    };
  }, [ref, threshold]);

  return visible;
}

// ─── Sub-components ────────────────────────────────────────────────────────

function Header({ scrollY }: { scrollY: number }) {
  const [open, setOpen] = useState(false);
  const solid = scrollY > 60;
  const { brand, nav } = siteData;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-orange-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center gap-3 group">
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm tracking-tight ${BTN_PRIMARY}`}
          >
            {brand.logoShort}
          </span>
          <span className="hidden sm:block text-gray-800 font-semibold text-sm tracking-widest uppercase">
            {brand.logoFull}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-600 hover:text-orange-600 text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.ctaHref}
            className={`ml-4 px-5 py-2 rounded-full text-sm tracking-wide hover:scale-105 ${BTN_PRIMARY}`}
          >
            {nav.ctaLabel}
          </a>
        </nav>

        <button
          className="md:hidden text-gray-800 p-2"
          onClick={() => setOpen(!open)}
          aria-label="メニューを開く"
        >
          <span className="block w-5 h-0.5 bg-gray-800 mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-gray-800 mb-1.5" />
          <span className="block w-5 h-0.5 bg-gray-800" />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-orange-100 px-6 py-6 flex flex-col gap-4 shadow-lg">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-orange-600 text-base font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.ctaHref}
            onClick={() => setOpen(false)}
            className={`mt-2 self-start px-6 py-3 rounded-full text-sm ${BTN_PRIMARY}`}
          >
            {nav.ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const { hero } = siteData;
  const hasHeadline = Boolean(
    hero.headline.line1 ||
      hero.headline.line2Prefix ||
      hero.headline.highlight ||
      hero.headline.suffix
  );

  useLayoutEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-32 overflow-x-hidden"
      id="top"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
      />
      {/* 写真のデザインが見えるよう、オーバーレイは薄め */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/35" />

      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox%3D%220 0 200 200%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter id%3D%22n%22%3E%3CfeTurbulence type%3D%22fractalNoise%22 baseFrequency%3D%220.75%22 numOctaves%3D%224%22 stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 filter%3D%22url(%23n)%22 opacity%3D%220.4%22%2F%3E%3C%2Fsvg%3E')",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <p
          className={`${revealHidden(loaded, "opacity-0 translate-y-4", "opacity-100 translate-y-0")} text-xs font-bold tracking-[0.3em] uppercase mb-6 text-orange-600`}
          style={{ transitionDelay: "0.1s" }}
        >
          {hero.tag}
        </p>

        {hasHeadline && (
          <h1
            className={`${revealHidden(loaded, "opacity-0 translate-y-6", "opacity-100 translate-y-0")} text-gray-900 font-black leading-[1.05] mb-8`}
            style={{
              fontFamily: "'Noto Serif JP', serif",
              fontSize: "clamp(2rem, 7vw, 6rem)",
              transitionDelay: "0.25s",
            }}
          >
            {hero.headline.line1}
            <br />
            {hero.headline.line2Prefix}
            <span className="text-orange-500">{hero.headline.highlight}</span>
            {hero.headline.suffix}
          </h1>
        )}

        <p
          className={`${revealHidden(loaded, "opacity-0 translate-y-6", "opacity-100 translate-y-0")} text-gray-700 text-base md:text-xl max-w-xl leading-relaxed mb-12 whitespace-pre-line`}
          style={{ transitionDelay: "0.4s" }}
        >
          {hero.description}
        </p>

        <div
          className={`${revealHidden(loaded, "opacity-0 translate-y-6", "opacity-100 translate-y-0")} flex flex-col sm:flex-row flex-wrap gap-4`}
          style={{ transitionDelay: "0.55s" }}
        >
          <a
            href={hero.ctaPrimary.href}
            className={`px-8 py-4 rounded-full text-sm tracking-wide hover:scale-105 ${BTN_PRIMARY}`}
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="px-8 py-4 rounded-full text-gray-800 font-bold text-sm tracking-wide border-2 border-orange-400 bg-white/80 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:border-orange-500 transition-all duration-200"
          >
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-gray-600 text-xs tracking-widest uppercase">{hero.scrollLabel}</span>
        <div className="w-px h-8 bg-orange-400 animate-pulse" />
      </div>
    </section>
  );
}

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);

  return (
    <div ref={ref} className="bg-orange-50 border-t border-orange-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-orange-200">
        {siteData.stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col items-center text-center ${revealHidden(
              visible,
              "opacity-0 translate-y-4",
              "opacity-100 translate-y-0"
            )}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span
              className="font-black text-4xl md:text-5xl leading-none text-orange-500"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {s.num}
            </span>
            <span className="text-gray-500 text-xs tracking-widest uppercase mt-1">{s.unit}</span>
            <span className="text-gray-700 text-sm mt-1">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.2);
  const { vision } = siteData;

  return (
    <section id="vision" ref={ref} className="bg-white py-20 md:py-40 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-orange-600 text-xs font-bold tracking-[0.3em] uppercase mb-8">
              {vision.sectionLabel}
            </p>
            <h2
              className={`${revealHidden(
                visible,
                "opacity-0 -translate-x-10",
                "opacity-100 translate-x-0"
              )} text-gray-900 font-black leading-[1.15] mb-8 duration-1000`}
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              }}
            >
              {vision.headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div
              className={`w-16 h-1 mb-8 bg-gradient-to-r from-orange-500 to-amber-500 ${revealHidden(
                visible,
                "opacity-0 scale-x-0",
                "opacity-100 scale-x-100"
              )}`}
              style={{ transformOrigin: "left", transitionDelay: "0.3s" }}
            />
            <p
              className={`${revealHidden(
                visible,
                "opacity-0 translate-y-4",
                "opacity-100 translate-y-0"
              )} text-gray-600 text-base md:text-lg leading-relaxed max-w-md whitespace-pre-line`}
              style={{ transitionDelay: "0.4s" }}
            >
              {vision.body}
            </p>
          </div>

          <div
            className={`relative h-80 md:h-[480px] w-full ${revealHidden(
              visible,
              "opacity-0 translate-x-10",
              "opacity-100 translate-x-0"
            )} duration-1000`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div
              className="absolute inset-0 rounded-2xl bg-cover bg-center shadow-xl shadow-orange-100"
              style={{ backgroundImage: `url('${vision.image}')` }}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-orange-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 rounded-b-2xl bg-white/85 backdrop-blur-sm">
              <p className="text-gray-800 text-sm font-medium">{vision.imageCaption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  p,
  index,
  readMoreLabel,
}: {
  p: Project;
  index: number;
  readMoreLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.1);

  return (
    <article
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-xl hover:shadow-orange-200/50 w-full ${
        p.size === "large" ? "md:col-span-2 md:row-span-2" : ""
      } ${revealHidden(visible, "opacity-0 translate-y-8", "opacity-100 translate-y-0")}`}
      style={{
        transitionDelay: `${index * 0.12}s`,
        minHeight: p.size === "large" ? "min(480px, 70vh)" : "min(300px, 50vh)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url('${p.img}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/25 to-transparent group-hover:from-orange-900/80 group-hover:via-orange-800/30 transition-all duration-500" />
      {p.href ? (
        <Link
          href={p.href}
          aria-label={`${p.title}の詳細を見る`}
          className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50"
        />
      ) : null}

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 text-white bg-gradient-to-r from-orange-500 to-amber-500">
          {p.tag}
        </span>
        <h3
          className="text-white font-bold text-xl md:text-2xl leading-snug mb-2"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {p.title}
        </h3>
        <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{p.desc}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>{readMoreLabel}</span>
          <span>→</span>
        </div>
      </div>
    </article>
  );
}

function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.1);
  const { projects } = siteData;

  return (
    <section id="projects" className="bg-orange-50 py-20 md:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div ref={ref} className="mb-14">
          <p className="text-orange-600 text-xs font-bold tracking-[0.3em] uppercase mb-4">
            {projects.sectionLabel}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className={`${revealHidden(
                visible,
                "opacity-0 translate-y-4",
                "opacity-100 translate-y-0"
              )} text-gray-900 font-black leading-tight`}
              style={{
                fontFamily: "'Noto Serif JP', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              {projects.titleLine1}
              <br />
              {projects.titleLine2}
            </h2>
            <a
              href={projects.viewAllHref}
              className="self-start md:self-end text-sm font-semibold text-orange-600 underline underline-offset-4 hover:text-orange-500 transition-colors"
            >
              {projects.viewAllLabel}
            </a>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 md:auto-rows-[300px]">
          {projects.items.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} readMoreLabel={projects.cardReadMore} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.2);
  const { join } = siteData;

  return (
    <section
      id="join"
      ref={ref}
      className="relative py-24 md:py-48 overflow-x-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500"
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-amber-300/30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center w-full">
        <p
          className={`${revealHidden(visible, "opacity-0", "opacity-100")} text-white text-xs font-bold tracking-[0.3em] uppercase mb-6`}
        >
          {join.sectionLabel}
        </p>
        <h2
          className={`${revealHidden(
            visible,
            "opacity-0 translate-y-6",
            "opacity-100 translate-y-0"
          )} font-black leading-tight mb-6 text-white`}
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            transitionDelay: "0.15s",
          }}
        >
          {join.titleLine1}
          <br />
          {join.titleLine2}
        </h2>
        <p
          className={`${revealHidden(
            visible,
            "opacity-0 translate-y-4",
            "opacity-100 translate-y-0"
          )} text-white text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 whitespace-pre-line`}
          style={{ transitionDelay: "0.3s" }}
        >
          {join.description}
        </p>
        <div
          className={`${revealHidden(
            visible,
            "opacity-0 translate-y-4",
            "opacity-100 translate-y-0"
          )} flex flex-col sm:flex-row gap-4 justify-center w-full`}
          style={{ transitionDelay: "0.45s" }}
        >
          <a
            href={join.ctaPrimary.href}
            className="px-10 py-4 rounded-full bg-white text-orange-600 font-bold text-sm tracking-wide shadow-lg hover:bg-orange-50 hover:shadow-xl transition-all duration-200"
          >
            {join.ctaPrimary.label}
          </a>
          <a
            href={join.ctaSecondary.href}
            className="px-10 py-4 rounded-full border-2 border-white/70 text-white font-bold text-sm tracking-wide hover:bg-white/15 hover:border-white transition-all duration-200"
          >
            {join.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { brand, footer } = siteData;

  return (
    <footer className="bg-white border-t border-orange-100 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-10 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs ${BTN_PRIMARY}`}
              >
                {brand.logoShort}
              </span>
              <span className="text-gray-800 font-semibold tracking-widest uppercase text-sm">
                {brand.logoFull}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{footer.description}</p>
          </div>

          <div>
            <h4 className="text-gray-800 text-xs font-bold tracking-widest uppercase mb-5">
              {footer.activityHeading}
            </h4>
            <ul className="space-y-3">
              {footer.activityLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-orange-600 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-800 text-xs font-bold tracking-widest uppercase mb-5">
              {footer.orgHeading}
            </h4>
            <ul className="space-y-3">
              {footer.orgLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-orange-600 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-orange-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">{footer.copyright}</p>
          <div className="flex gap-6">
            {footer.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-500 hover:text-orange-600 text-xs font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Home() {
  const scrollY = useScrollY();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700;900&display=swap');
      `}</style>

      <div className="min-h-screen w-full bg-white text-gray-800">
        <Header scrollY={scrollY} />
        <main className="flex flex-col w-full">
          <Hero />
          <StatsBar />
          <VisionSection />
          <ProjectsSection />
          <JoinSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

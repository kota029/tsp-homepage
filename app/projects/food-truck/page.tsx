"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  Star,
  Leaf,
  AlertCircle,
  Send,
  Scissors,
  Heart,
  Flame,
  Users,
  ChevronDown,
  Wheat,
  Phone,
  ExternalLink,
  Sparkles,
  Tag,
} from "lucide-react";

// ─── Color Palette ────────────────────────────────────────────────────────────
// Primary:  #E8622A (burnt orange)   #F4A535 (golden yellow)
// Earth:    #8B4513 (saddle brown)   #D2691E (chocolate)
// Accent:   #2D5016 (dark green)     #F5E6C8 (warm cream)
// BG:       #FEF9F0 (off-white warm) #1A0F00 (deep espresso)

// ─── Data ────────────────────────────────────────────────────────────────────

const schedule = [
  { day: "月", date: "6/2", location: "〇〇大学 北キャンパス前", time: "11:00–14:00", icon: "🎓" },
  { day: "水", date: "6/4", location: "△△地域コミュニティセンター", time: "11:30–15:00", icon: "🏘️" },
  { day: "金", date: "6/6", location: "〇〇商店街 中央広場", time: "12:00–16:00", icon: "🛍️" },
  { day: "土", date: "6/7", location: "□□公園 週末マルシェ", time: "10:00–17:00", icon: "🌳" },
];

const menuItems = [
  {
    id: 1,
    name: "クラシック・ビーフタコス",
    price: 650,
    studentPrice: 550,
    description: "じっくり煮込んだ牛肉に手作りサルサとアボカド。定番の旨さ。",
    emoji: "🌮",
    tags: ["小麦", "乳製品"],
    spicy: 1,
    popular: true,
    color: "#E8622A",
  },
  {
    id: 2,
    name: "スパイシー・チキンタコス",
    price: 620,
    studentPrice: 520,
    description: "国産鶏もも肉をチポトレ風味でグリル。ピリッとした刺激がクセになる。",
    emoji: "🔥",
    tags: ["小麦"],
    spicy: 3,
    popular: false,
    color: "#D2691E",
  },
  {
    id: 3,
    name: "ベジ・タコス（野菜たっぷり）",
    price: 580,
    studentPrice: 480,
    description: "地元農家から仕入れた旬野菜と黒豆のコンビネーション。体に優しい一品。",
    emoji: "🥬",
    tags: ["小麦", "大豆"],
    spicy: 0,
    popular: false,
    color: "#2D5016",
  },
  {
    id: 4,
    name: "シュリンプ・タコス",
    price: 700,
    studentPrice: 600,
    description: "プリプリの国産エビにコールスローとライム。爽やかな海の味。",
    emoji: "🦐",
    tags: ["小麦", "甲殻類"],
    spicy: 1,
    popular: true,
    color: "#F4A535",
  },
];

const allergyColors: Record<string, string> = {
  小麦: "#D2691E",
  乳製品: "#F4A535",
  大豆: "#8B7355",
  甲殻類: "#E8622A",
  豚肉: "#C0392B",
};

const teamMembers = [
  { name: "Daichi", role: "リーダー / 仕込み担当", emoji: "👨‍🍳" },
  { name: "Rio", role: "レシピ開発 / SNS担当", emoji: "👩‍🍳" },
  { name: "Taisei", role: "営業 / 出店交渉担当", emoji: "🧑‍💼" },
  { name: "Yuka", role: "デザイン / イベント企画", emoji: "👩‍🎨" },
];

const instagramPosts = [
  { emoji: "🌮", caption: "今日も最高の仕込み！ #タコス #フードトラック", likes: 124 },
  { emoji: "🔥", caption: "週末マルシェに出店します！", likes: 89 },
  { emoji: "🌽", caption: "地元農家さんから新鮮コーン届いた🌽", likes: 201 },
  { emoji: "👨‍🍳", caption: "チームで皮から手作り！愛情込めて", likes: 156 },
  { emoji: "🎓", caption: "学割始めました！学生証を見せてね", likes: 178 },
  { emoji: "🚚", caption: "新スポットにも出店開始！お楽しみに", likes: 93 },
];

// ─── Components ───────────────────────────────────────────────────────────────

function SpicyIndicator({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <Flame
          key={i}
          size={13}
          className={i <= level ? "text-red-500 fill-red-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function AllergyTag({ tag }: { tag: string }) {
  const color = allergyColors[tag] || "#888";
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-xs font-bold"
      style={{ backgroundColor: color }}
    >
      <AlertCircle size={10} />
      {tag}
    </span>
  );
}

function InstagramGlyph({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-[28%] font-black leading-none ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, Math.round(size * 0.5)),
        background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737, #FCAF45)",
        color: "#fff",
      }}
    >
      IG
    </span>
  );
}

function MenuCard({ item }: { item: (typeof menuItems)[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "280px",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Photo placeholder */}
          <div
            className="h-40 flex items-center justify-center text-7xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${item.color}22, ${item.color}44)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, ${item.color} 0, ${item.color} 1px, transparent 0, transparent 50%)`,
                backgroundSize: "10px 10px",
              }}
            />
            <span className="relative drop-shadow-lg">{item.emoji}</span>
            {item.popular && (
              <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-1 rounded-full flex items-center gap-1">
                <Star size={10} fill="currentColor" />
                人気
              </div>
            )}
          </div>
          {/* Info */}
          <div className="p-4 bg-white">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-black text-gray-900 text-sm leading-tight">{item.name}</h3>
              <SpicyIndicator level={item.spicy} />
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{item.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-black" style={{ color: item.color }}>
                  ¥{item.price}
                </span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                  学割¥{item.studentPrice}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.map((t) => (
                <AllergyTag key={t} tag={t} />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">タップで詳細 →</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg p-5 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
          }}
        >
          <div className="text-5xl mb-3 text-center">{item.emoji}</div>
          <h3 className="text-white font-black text-lg text-center mb-3">{item.name}</h3>
          <div className="bg-white bg-opacity-20 rounded-xl p-3 mb-3">
            <p className="text-white text-sm font-semibold mb-1">アレルギー情報</p>
            <div className="flex flex-wrap gap-1">
              {item.tags.map((t) => (
                <span key={t} className="bg-white text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  ⚠️ {t}
                </span>
              ))}
            </div>
          </div>
          <p className="text-white text-xs text-center opacity-80">
            アレルギーをお持ちの方はスタッフにお声がけください
          </p>
          <p className="text-white text-xs text-center mt-3 opacity-70">← タップで戻る</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function KitchenCarPage() {
  const [scrollY, setScrollY] = useState(0);
  const [couponFlipped, setCouponFlipped] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEF9F0", fontFamily: "'Georgia', serif" }}>

      {/* ━━━━ 1. HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* BG gradient + texture */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #1A0F00 0%, #3D1F00 40%, #8B4513 80%, #D2691E 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4A535' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Parallax truck emoji / photo placeholder */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-10"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <span className="text-[30vw] select-none">🚚</span>
        </div>

        {/* Photo placeholder badge */}
        <div className="absolute top-6 right-6 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl px-3 py-2 text-white text-xs text-center">
          <div className="text-2xl mb-1">📸</div>
          <div className="font-bold">写真プレースホルダー</div>
          <div className="opacity-70">キッチンカー写真を配置</div>
        </div>

        {/* Hero text */}
        <div
          className="relative z-10 text-center px-6 max-w-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-black mb-6 shadow-lg">
            <Sparkles size={14} />
            学生団体 TACO LOVERS 運営
          </div>
          <h1
            className="font-black leading-tight mb-4"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              color: "#FEF9F0",
              textShadow: "0 4px 20px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            地域をタコスで繋ぐ、
            <br />
            <span style={{ color: "#F4A535" }}>移動式コミュニティハブ</span>
          </h1>
          <p
            className="text-lg mb-8 leading-relaxed max-w-xl mx-auto"
            style={{ color: "#F5E6C8", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
          >
            学生たちが皮から手作りするタコスで、笑顔と温もりをあなたの街へ。
            <br />
            今日も、どこかで出会えることを楽しみにしています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#schedule"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-white shadow-xl transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #E8622A, #F4A535)" }}
            >
              <MapPin size={18} />
              今週の出店場所を見る
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black border-2 border-white text-white transition-all hover:bg-white hover:bg-opacity-10"
            >
              メニューを見る
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ChevronDown className="text-white opacity-60" size={28} />
        </div>

        {/* Diagonal cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background: "#FEF9F0",
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
          }}
        />
      </section>

      {/* ━━━━ 2. SCHEDULE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="schedule" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold mb-3">
              📅 出店スケジュール
            </span>
            <h2
              className="font-black text-3xl sm:text-4xl mb-3"
              style={{ color: "#1A0F00", letterSpacing: "-0.02em" }}
            >
              今週の出店場所・時間はこちら！
            </h2>
            <p className="text-gray-500">最新情報はInstagramでもお知らせしています</p>
          </div>

          {/* Calendar placeholder */}
          <div
            className="rounded-3xl overflow-hidden shadow-xl mb-10 border-2"
            style={{ borderColor: "#F4A535" }}
          >
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{ background: "linear-gradient(135deg, #E8622A, #F4A535)" }}
            >
              <Calendar className="text-white" size={22} />
              <span className="text-white font-black text-lg">Google カレンダー（埋め込み予定）</span>
            </div>
            <div
              className="flex flex-col items-center justify-center py-16 bg-white"
              style={{ minHeight: "280px" }}
            >
              {/* Google Calendar iframe を↓に置き換えてください */}
              {/* <iframe
                src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID"
                className="w-full h-full border-0"
                style={{ minHeight: "280px" }}
              /> */}
              <Calendar size={52} className="text-orange-200 mb-4" />
              <p className="text-gray-400 font-bold text-lg">Googleカレンダー 埋め込みエリア</p>
              <p className="text-gray-300 text-sm mt-1">src に Google Calendar の公開 URL を設定してください</p>
            </div>
          </div>

          {/* Schedule list */}
          <div className="grid sm:grid-cols-2 gap-4">
            {schedule.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-md border border-orange-100 hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 text-white font-black shadow-md"
                  style={{ background: "linear-gradient(135deg, #E8622A, #F4A535)" }}
                >
                  <span className="text-xs">{s.day}</span>
                  <span className="text-lg leading-none">{s.date}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-gray-800 font-bold truncate">
                    <span>{s.icon}</span>
                    <span className="truncate">{s.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-0.5">
                    <Clock size={13} />
                    {s.time}
                  </div>
                </div>
                <MapPin size={18} className="text-orange-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━ 3. MENU ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="menu" className="py-20 px-4" style={{ backgroundColor: "#1A0F00" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-black mb-3">
              🌮 メニュー
            </span>
            <h2
              className="font-black text-3xl sm:text-4xl mb-3"
              style={{ color: "#FEF9F0", letterSpacing: "-0.02em" }}
            >
              こだわりのタコスライン
            </h2>
            <p style={{ color: "#D2691E" }} className="text-sm">
              カードをタップするとアレルギー情報が確認できます
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          {/* Allergy note */}
          <div
            className="rounded-2xl p-5 flex flex-col sm:flex-row items-start gap-3"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <AlertCircle className="text-yellow-400 shrink-0 mt-0.5" size={22} />
            <div>
              <p className="text-white font-bold mb-1">アレルギーについて</p>
              <p style={{ color: "#D2691E" }} className="text-sm leading-relaxed">
                当店のタコスは小麦粉を使用したトルティーヤを使用しています。アレルギーをお持ちのお客様は注文前に必ずスタッフにお申し付けください。
                食材の取り扱いには十分注意していますが、共通の調理器具を使用している場合があります。
              </p>
            </div>
          </div>

          {/* Student discount note */}
          <div
            className="mt-4 rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(244,165,53,0.15)", border: "1px solid rgba(244,165,53,0.3)" }}
          >
            <Tag className="text-yellow-400 shrink-0" size={20} />
            <p className="text-yellow-200 text-sm">
              <span className="font-black text-yellow-400">学割価格</span>
              は学生証のご提示で適用されます。各種学生証・学生アプリ画面も対応可。
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━ 4. STORY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-4" style={{ backgroundColor: "#FEF9F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold mb-3">
              💚 ストーリー
            </span>
            <h2
              className="font-black text-3xl sm:text-4xl mb-3"
              style={{ color: "#1A0F00", letterSpacing: "-0.02em" }}
            >
              タコスに込めた、僕らの想い
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
            {/* Story text */}
            <div className="space-y-5">
              {[
                {
                  icon: "🫶",
                  title: "皮から手作り",
                  text: "市販のトルティーヤは一切使いません。メキシコの伝統製法を学び、毎日の仕込みからすべて手作り。その手間が、他では出せない「ふんわり・もちもち」食感を生み出しています。",
                },
                {
                  icon: "🥬",
                  title: "地元の新鮮な野菜を使用",
                  text: "近隣農家さんと直接契約し、旬の地野菜を使用しています。「地元の恵みを地元の食卓へ」というコンセプトのもと、産地が見える安心な食材づくりを大切にしています。",
                },
                {
                  icon: "🌍",
                  title: "地域を繋ぐコミュニティハブ",
                  text: "ただ食べ物を売るだけでなく、キッチンカーを通じて人と人が繋がる「広場」を作りたい。マルシェや学祭、地域イベントへの出店を通じて、笑顔の輪を広げています。",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white shadow-sm">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: "linear-gradient(135deg, #F4A53522, #E8622A22)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Team photo placeholder */}
            <div>
              <div
                className="rounded-3xl overflow-hidden shadow-xl aspect-square flex items-center justify-center relative"
                style={{ background: "linear-gradient(135deg, #F5E6C8, #D2691E44)" }}
              >
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #E8622A 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative text-center p-8">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="font-black text-gray-600 text-lg mb-2">チーム写真プレースホルダー</p>
                  <p className="text-gray-500 text-sm">活動中の写真を配置してください</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team members */}
          <div>
            <h3 className="text-center font-black text-xl text-gray-800 mb-6">
              <Users size={20} className="inline mr-2" />
              運営メンバー
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {teamMembers.map((m, i) => (
                <div
                  key={i}
                  className="text-center p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl shadow-md"
                    style={{ background: "linear-gradient(135deg, #F4A535, #E8622A)" }}
                  >
                    {m.emoji}
                  </div>
                  <p className="font-black text-gray-900">{m.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━ 5. INSTAGRAM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(180deg, #FEF9F0, #F5E6C8)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <InstagramGlyph size={24} />
              <span className="font-black text-xl text-gray-800">@tacolovers_jp</span>
            </div>
            <h2
              className="font-black text-3xl sm:text-4xl"
              style={{ color: "#1A0F00", letterSpacing: "-0.02em" }}
            >
              最新の出店風景
            </h2>
            <p className="text-gray-500 mt-2 text-sm">Instagramで日々の活動を発信中！</p>
          </div>

          {/* IG grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8">
            {instagramPosts.map((post, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                style={{ background: `linear-gradient(135deg, #E8622A${30 + i * 10}, #F4A535${40 + i * 10})` }}
              >
                {/* Pattern bg */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `repeating-linear-gradient(${45 + i * 30}deg, #FFF 0, #FFF 1px, transparent 0, transparent 8px)`,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <span className="text-3xl sm:text-4xl mb-1">{post.emoji}</span>
                  <span className="text-white text-xs text-center font-semibold hidden sm:block opacity-80 leading-tight">
                    {post.caption}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold flex items-center gap-1">
                    <Heart size={14} fill="currentColor" />
                    {post.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-lg transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #E1306C, #F77737, #FCAF45)" }}
            >
              <InstagramGlyph size={18} />
              Instagramをフォローする
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ━━━━ 6. COUPON ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-4" style={{ backgroundColor: "#1A0F00" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-black mb-3"
              style={{ background: "#F4A535", color: "#1A0F00" }}
            >
              🎁 特典・クーポン
            </span>
            <h2
              className="font-black text-3xl sm:text-4xl"
              style={{ color: "#FEF9F0", letterSpacing: "-0.02em" }}
            >
              お得な特典をゲット！
            </h2>
          </div>

          {/* Coupon card */}
          <div
            className="cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setCouponFlipped(!couponFlipped)}
          >
            <div
              className="relative transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: couponFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                minHeight: "220px",
              }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  background: "linear-gradient(135deg, #F4A535, #E8622A)",
                }}
              >
                {/* Dashed cut border */}
                <div className="absolute inset-3 rounded-2xl border-4 border-dashed border-white border-opacity-50" />
                {/* Scissors icon */}
                <div className="absolute -top-3 left-8">
                  <div className="bg-gray-900 rounded-full p-1.5">
                    <Scissors size={16} className="text-yellow-400" />
                  </div>
                </div>
                <div className="relative p-8 flex flex-col sm:flex-row items-center gap-6 h-full">
                  <div className="text-6xl sm:text-7xl">🌮</div>
                  <div className="text-center sm:text-left">
                    <p className="text-white font-black text-2xl sm:text-3xl leading-tight mb-2">
                      この画面を提示で
                      <br />
                      <span className="text-yellow-900 bg-yellow-300 px-2 rounded">トッピング1つ無料！</span>
                    </p>
                    <p className="text-white text-sm opacity-90">有効期限：2025年7月31日まで / 1回限り</p>
                    <p className="text-white text-xs opacity-70 mt-1">※他の割引との併用不可</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 text-white text-xs opacity-60">
                  タップで学割クーポンへ →
                </div>
              </div>

              {/* Back (student coupon) */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(135deg, #2D5016, #4A7C22)",
                }}
              >
                <div className="absolute inset-3 rounded-2xl border-4 border-dashed border-white border-opacity-50" />
                <div className="absolute -top-3 left-8">
                  <div className="bg-gray-900 rounded-full p-1.5">
                    <Scissors size={16} className="text-green-400" />
                  </div>
                </div>
                <div className="relative p-8 flex flex-col sm:flex-row items-center gap-6 h-full">
                  <div className="text-6xl sm:text-7xl">🎓</div>
                  <div className="text-center sm:text-left">
                    <p className="text-white text-sm font-bold mb-1 opacity-80">学割クーポン</p>
                    <p className="text-white font-black text-2xl sm:text-3xl leading-tight mb-2">
                      全品
                      <span className="text-yellow-300"> ¥100 OFF！</span>
                    </p>
                    <p className="text-white text-sm opacity-90">
                      学生証と一緒にこの画面を提示してください
                    </p>
                    <p className="text-white text-xs opacity-70 mt-1">有効期限：2025年8月31日まで</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 text-white text-xs opacity-60">
                  ← タップで戻る
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-5">
            クーポンをタップして切り替え・スタッフにご提示ください
          </p>
        </div>
      </section>

      {/* ━━━━ 7. CTA / CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        className="py-24 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #E8622A, #F4A535, #D2691E)" }}
      >
        {/* BG decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFF' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">🚚</div>
          <h2
            className="font-black text-3xl sm:text-5xl mb-4 text-white"
            style={{ letterSpacing: "-0.03em", textShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
          >
            イベント出店・コラボのご依頼
          </h2>
          <p className="text-white text-lg mb-8 opacity-90 leading-relaxed">
            学園祭、地域イベント、企業コラボなど
            <br />
            どんなご相談もお気軽にどうぞ！
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://forms.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-black text-xl bg-white shadow-2xl transition-all hover:scale-105 active:scale-95"
              style={{ color: "#E8622A" }}
            >
              <Send size={22} />
              出店依頼フォームはこちら
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a
              href="tel:000-0000-0000"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold border-2 border-white text-white transition-all hover:bg-white hover:bg-opacity-20"
            >
              <Phone size={16} />
              000-0000-0000
            </a>
            <a
              href="mailto:tacolovers@example.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold border-2 border-white text-white transition-all hover:bg-white hover:bg-opacity-20"
            >
              <Send size={16} />
              tacolovers@example.com
            </a>
          </div>
        </div>
      </section>

      {/* ━━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="py-10 px-4 text-center" style={{ backgroundColor: "#1A0F00" }}>
        <div className="text-3xl mb-3">🌮</div>
        <p className="font-black text-yellow-400 text-lg">TACO LOVERS</p>
        <p className="text-gray-500 text-sm mt-1">学生団体フードトラック × 地域コミュニティ</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <InstagramGlyph size={20} className="hover:opacity-80 transition-opacity" />
          </a>
          <Leaf size={20} className="text-gray-600" />
        </div>
        <p className="text-gray-700 text-xs mt-6">© 2025 TACO LOVERS All rights reserved.</p>
      </footer>
    </div>
  );
}
/**
 * サイトの文言・画像URLはこのファイルだけ編集してください。
 * 保存するとページに自動で反映されます（開発サーバー起動中の場合）。
 */

export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: number;
  tag: string;
  title: string;
  desc: string;
  /** 画像URL（例: https://... または /images/photo.jpg） */
  img: string;
  size: "large" | "small";
};

export type Stat = {
  num: string;
  unit: string;
  label: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export const siteData = {
  /** ロゴ・サイト名 */
  brand: {
    logoShort: "TSP",
    logoFull: "Taco Social Project",
  },

  /** ヘッダーナビ */
  nav: {
    links: [
      { label: "活動について", href: "#about" },
      { label: "プロジェクト", href: "#projects" },
      { label: "ビジョン", href: "#vision" },
      { label: "参加する", href: "#join" },
    ] satisfies NavLink[],
    ctaLabel: "メンバー募集中",
    ctaHref: "#join",
  },

  /** ヒーロー（トップ） */
  hero: {
    /** public/images/ に置いた画像（例: /images/hero-background.png） */
    backgroundImage: "/images/hero-background.png",
    tag: "Student Social Project",
    headline: {
      line1: "",
      line2Prefix: "",
      highlight: "",
      suffix: "",
    },
    description:
      "TSPは食を通じて地域課題に向き合う学生団体です。\n一枚のタコスが、地域・社会・未来をつなぐ。",
    ctaPrimary: { label: "活動を見る", href: "#projects" },
    ctaSecondary: { label: "私たちのビジョン", href: "#vision" },
    scrollLabel: "Scroll",
  },

  /** 統計バー */
  stats: [
    { num: "相模原・東京", unit: "２都市", label: "活動拠点" },
    { num: "700+", unit: "人", label: "参加学生数" },
    { num: "3", unit: "団体", label: "連携団体数" },
    { num: "2,000", unit: "食分", label: "提供タコス数" },
  ] satisfies Stat[],

  /** ビジョン */
  vision: {
    sectionLabel: "Our Vision",
    headlineLines: ["「いただきます」でつながる", "地域の大きな家族。"],
    body:
      "TSPは、子ども食堂やキッチンカーを通じた食の活動により、\n多世代が自然に集う交流の場を創出します。\n地域内の孤立を防ぎ、住民同士が温かく支え合い、\n新たな挑戦が循環する持続可能なコミュニティを目指します。",
    image:
      "/images/vision-image.png",
    imageCaption:
      "中央区大野北公民館で行われたこども祭りで出店した時の様子（相模原市・2025年冬）",
  },

  /** プロジェクト（活動カード） */
  projects: {
    sectionLabel: "Projects",
    titleLine1: "現場から生まれた、",
    titleLine2: "活動の記録",
    viewAllLabel: "すべての活動を見る →",
    viewAllHref: "#",
    cardReadMore: "詳しく読む",
    items: [
      {
        id: 1,
        tag: "地域連携",
        title: "TSP子ども食堂プロジェクト",
        desc: "地元食材を使ったタコスで、廃校になった集落の広場を週末マーケットとして復活させた試み。地域の高齢者と学生が共同で運営する。",
        img: "/images/project-1-kids-cafeteria.png",
        size: "large",
      },
      {
        id: 2,
        tag: "フードロス削減",
        title: "規格外野菜 × タコスレシピ開発",
        desc: "農家から廃棄予定の野菜を買い取り、オリジナルレシピを開発。販売収益の一部を農家に還元するサーキュラーモデル。",
        img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
        size: "small",
      },
      {
        id: 3,
        tag: "教育",
        title: "高校生向け社会起業ワークショップ",
        desc: "食ビジネスを入口に、社会課題を自分ごととして考えるワークショップを全国10校で開催。",
        img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        size: "small",
      },
      {
        id: 4,
        tag: "まちづくり",
        title: "空き店舗をポップアップ拠点に",
        desc: "全国の空き店舗・空き地を一時利用し、学生がタコス出店を通じて地域住民との対話の場をつくる。",
        img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        size: "large",
      },
    ] satisfies Project[],
  },

  /** 参加する */
  join: {
    sectionLabel: "Join Us",
    titleLine1: "一緒に、タコスで",
    titleLine2: "地域を変えよう。",
    description:
      "TSPでは学生メンバーを随時募集しています。調理・企画・デザイン・営業など\n様々な役割で活躍できます。まずは気軽に話を聞きに来てください。",
    ctaPrimary: { label: "メンバー登録フォームへ", href: "#" },
    ctaSecondary: { label: "詳細を読む", href: "#" },
  },

  /** フッター */
  footer: {
    description:
      "食を通じて社会課題に向き合う学生団体。タコスが地域・農家・未来をつなぐ架け橋になることを目指しています。",
    activityHeading: "活動",
    activityLinks: [
      { label: "プロジェクト一覧", href: "#" },
      { label: "イベント情報", href: "#" },
      { label: "メンバー紹介", href: "#" },
      { label: "メディア掲載", href: "#" },
    ] satisfies FooterLink[],
    orgHeading: "組織",
    orgLinks: [
      { label: "ビジョン・理念", href: "#" },
      { label: "参加する", href: "#join" },
      { label: "パートナー", href: "#" },
      { label: "お問い合わせ", href: "#" },
    ] satisfies FooterLink[],
    copyright: "© 2025 Taco Social Project. All rights reserved.",
    socialLinks: [
      { label: "Instagram", href: "#" },
      { label: "Twitter / X", href: "#" },
      { label: "note", href: "#" },
    ] satisfies FooterLink[],
  },
} as const;

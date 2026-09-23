export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const LOGOS = [
  { name: "boAt", style: "bold" },
  { name: "Nykaa", style: "serif" },
  { name: "swiggy", style: "bold" },
  { name: "zomato", style: "bold" },
  { name: "Flipkart", style: "bold" },
  { name: "amazon", style: "bold" },
  { name: "and 12,000+ more", style: "meta" },
] as const;

export type FeatureKey = "ai" | "order" | "dashboard" | "upsell" | "insights" | "reengage";

export const FEATURES: {
  icon: FeatureKey;
  title: string;
  desc: string;
  tag: string;
}[] = [
  {
    icon: "ai",
    title: "AI Customer Assistant",
    desc: "Answer questions, guide customers, close sales — 24/7. Trained on your catalog, tone, and policies in minutes.",
    tag: "24/7",
  },
  {
    icon: "order",
    title: "Smart Ordering",
    desc: "Let customers browse, customize, and order in seconds — from any device, with zero downloads and zero friction.",
    tag: "3s checkout",
  },
  {
    icon: "dashboard",
    title: "Real-Time Dashboard",
    desc: "See every order as it happens. Accept, track, and fulfill from one live command center — with instant alerts.",
    tag: "0s latency",
  },
  {
    icon: "upsell",
    title: "Automated Upsells",
    desc: "Boost order value with smart, contextual suggestions — placed exactly where customers say yes.",
    tag: "+24% AOV",
  },
  {
    icon: "insights",
    title: "Customer Insights",
    desc: "Know your bestsellers, repeat buyers, and revenue trends. A daily digest you'll actually read.",
    tag: "Real-time",
  },
  {
    icon: "reengage",
    title: "Re-Engagement",
    desc: "Win back customers with automated follow-ups, reminders, and offers that feel personal — not spammy.",
    tag: "3× repeat rate",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Connect your catalog",
    desc: "Upload your products or services, set pricing, and make it yours — logo, colors, and a page that looks like you built it.",
    chip: "catalog.csv → 42 products mapped",
  },
  {
    n: "02",
    title: "Share your link",
    desc: "Send customers to your branded ordering page. Put it on your website, your socials, your emails — anywhere they are.",
    chip: "zynt.ai/yourbrand",
  },
  {
    n: "03",
    title: "Orders flow in",
    desc: "Real-time notifications, effortless fulfillment, automatic follow-ups. You watch the revenue; Zyntai handles the busywork.",
    chip: "Order #1042 · $240.00 · paid",
  },
];

export const PLANS = [
  {
    name: "Starter",
    monthly: 19,
    annual: 15,
    blurb: "For solo businesses getting started.",
    cta: "Start free",
    highlight: false,
    features: [
      "1 workspace",
      "Unlimited products & services",
      "Branded order page",
      "Live order dashboard",
      "Email support",
    ],
  },
  {
    name: "Growth",
    monthly: 49,
    annual: 39,
    blurb: "For growing teams that need more power.",
    cta: "Start free",
    highlight: true,
    features: [
      "Everything in Starter",
      "3 workspaces",
      "AI customer assistant",
      "Automated upsells",
      "Re-engagement campaigns",
      "Customer insights + daily digest",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    monthly: 99,
    annual: 79,
    blurb: "For established businesses ready to automate.",
    cta: "Talk to sales",
    highlight: false,
    features: [
      "Everything in Growth",
      "Unlimited workspaces",
      "Stripe, Shopify & Zapier integrations",
      "Multi-team analytics",
      "Custom domain & white-label",
      "API access",
      "Dedicated success manager",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "We plugged Zyntai in on a Tuesday. By Friday, half our orders came through it and my inbox was quiet for the first time in years. It paid for itself the first weekend.",
    name: "Maya Lindqvist",
    role: "Founder",
    company: "Nova Studio",
    initials: "ML",
    metric: "+40% orders in 60 days",
    tilt: "-rotate-2",
  },
  {
    quote:
      "The AI assistant answers 80% of questions before my team ever sees them. We saved ten hours a week — and customers keep telling us how fast we respond.",
    name: "Daniel Reyes",
    role: "Head of Operations",
    company: "Pulse Fitness",
    initials: "DR",
    metric: "10 hrs saved / week",
    tilt: "rotate-1",
  },
  {
    quote:
      "I'm not technical. I uploaded a spreadsheet, shared one link, and orders started flowing. The automated follow-ups alone brought back a fifth of our old customers.",
    name: "Amara Osei",
    role: "Owner",
    company: "Drift & Co.",
    initials: "AO",
    metric: "Setup: 11 minutes",
    tilt: "rotate-2",
  },
];

export const FAQS = [
  {
    q: "How long does it take to go live?",
    a: "Most teams are taking orders within 15 minutes. Upload your catalog as a spreadsheet or CSV, Zyntai structures it automatically, and your branded page is ready to share.",
  },
  {
    q: "Do my customers need to download an app?",
    a: "Never. Zyntai runs in the browser — customers tap your link and order instantly. That's why conversion runs 2–3× higher than app-based tools.",
  },
  {
    q: "What does the AI assistant actually answer?",
    a: "Whatever you train it on: pricing, availability, shipping, policies, comparisons. It replies in your tone, 24/7, and hands off to a human the moment a customer asks for one.",
  },
  {
    q: "Does it integrate with my existing tools?",
    a: "Yes. Growth and Scale plans connect to Stripe, Shopify, and Zapier — so orders, payments, and notifications sync straight into the systems you already use.",
  },
  {
    q: "Can I try it before paying?",
    a: "Every plan starts with a 14-day free trial, no credit card required. Full feature set, cancel in two clicks if it's not a fit.",
  },
  {
    q: "Which currencies and languages are supported?",
    a: "Zyntai works in 120+ countries with 30+ currencies, automatic regional tax rules, and pages in 14 languages.",
  },
];

export const STATS = [
  { value: 2.4, suffix: "M+", decimals: 1, label: "orders routed" },
  { value: 24, suffix: "%", decimals: 0, label: "avg. order-value lift" },
  { value: 12, suffix: "k+", decimals: 0, label: "businesses on Zyntai" },
  { value: 4, suffix: " min", decimals: 0, label: "average setup" },
];

export type CompareCell = boolean | string;

export const COMPARISON_GROUPS: {
  group: string;
  rows: { feature: string; starter: CompareCell; growth: CompareCell; scale: CompareCell }[];
}[] = [
  {
    group: "Core",
    rows: [
      { feature: "Order dashboard", starter: true, growth: true, scale: true },
      { feature: "Smart ordering & checkout", starter: true, growth: true, scale: true },
      { feature: "Custom branding & order page", starter: true, growth: true, scale: true },
      { feature: "Workspaces", starter: "1", growth: "3", scale: "Unlimited" },
      { feature: "Team seats", starter: "2", growth: "10", scale: "Unlimited" },
    ],
  },
  {
    group: "Growth tools",
    rows: [
      { feature: "AI customer assistant", starter: false, growth: true, scale: true },
      { feature: "Automated upsells", starter: false, growth: true, scale: true },
      { feature: "Re-engagement campaigns", starter: false, growth: true, scale: true },
      { feature: "Customer insights & analytics", starter: "Basic", growth: "Advanced", scale: "Multi-team" },
    ],
  },
  {
    group: "Scale & support",
    rows: [
      { feature: "Integrations (Stripe, Shopify, Zapier)", starter: false, growth: false, scale: true },
      { feature: "API access", starter: false, growth: false, scale: true },
      { feature: "Custom domain & white-label", starter: false, growth: false, scale: true },
      { feature: "Priority support", starter: false, growth: true, scale: true },
      { feature: "Dedicated success manager", starter: false, growth: false, scale: true },
    ],
  },
];

export const PRICING_FAQS = [
  {
    q: "Can I switch plans later?",
    a: "Anytime, in two clicks. Upgrades apply instantly and we prorate the difference automatically. Downgrades take effect at the start of your next billing cycle — you never lose data.",
  },
  {
    q: "What happens when my trial ends?",
    a: "You pick a plan and keep going. If you don't, your workspace is gently paused — nothing is deleted, and everything comes back the moment you subscribe. No card is required to start.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. Every paid plan comes with a 30-day money-back guarantee. If Zyntai isn't earning its keep, email us and we'll refund you in full — no forms, no friction.",
  },
  {
    q: "Are there discounts for nonprofits or early-stage teams?",
    a: "Registered nonprofits and teams under a year old get 30% off any plan. Write to hello@zyntai.app with a sentence about what you're building and we'll set it up.",
  },
];

export const FAQ_GROUPS: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Getting started",
    items: [
      {
        q: "What is Zyntai?",
        a: "Zyntai is an AI-powered platform for taking orders and automating the busywork around them. You get a branded order page, a live order dashboard, an AI assistant that talks to your customers, and automations for upsells, follow-ups, and re-engagement — all in one place.",
      },
      {
        q: "How does it work?",
        a: "Three steps. Upload your catalog and set pricing. Share your branded link anywhere customers already are. Orders flow in with real-time notifications while the AI handles questions, upsells, and follow-ups automatically.",
      },
      {
        q: "How long does setup take?",
        a: "About 15 minutes. Import your products or services from a spreadsheet or CSV — Zyntai structures everything automatically, applies your branding, and your page is ready to share.",
      },
      {
        q: "Do I need technical skills?",
        a: "No. Everything is visual — catalog, branding, automations, analytics. If you do have developers, the Scale plan includes full API access for custom integrations, but it's optional, not required.",
      },
    ],
  },
  {
    group: "Features & AI",
    items: [
      {
        q: "How does the AI assistant work?",
        a: "You train it on your catalog, policies, and tone of voice — usually by pointing it at your existing content. It then answers customer questions, recommends products, and guides people to checkout 24/7, and hands off to a human the moment someone asks for one.",
      },
      {
        q: "Can I customize my branding?",
        a: "Completely. Your logo, colors, typography, and photography on every page. Scale plans add a custom domain and full white-labeling, so the platform looks like yours, not ours.",
      },
      {
        q: "What payment methods can my customers use?",
        a: "Everything modern checkout should support: major cards via Stripe, Apple Pay, Google Pay, PayPal, and bank transfer. On Scale you can also enable invoicing and payment links for larger orders.",
      },
      {
        q: "What are re-engagement campaigns?",
        a: "Automated follow-ups that win customers back: post-order thank-yous, gentle reminders for repeat purchases, and win-back offers for customers who've gone quiet. Triggered by behavior, written in your tone.",
      },
    ],
  },
  {
    group: "Pricing & plans",
    items: [
      {
        q: "Is there a free trial?",
        a: "Yes — 14 days on any plan, with the full feature set and no credit card required. Most teams decide within the first week because the results show up that fast.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Anytime, in two clicks, no phone calls. You keep access until the end of your billing period, and you can export all your data whenever you like.",
      },
      {
        q: "Can I switch plans later?",
        a: "Whenever you want. Upgrades apply instantly with automatic proration; downgrades start next cycle. Your catalog, customers, and history move with you.",
      },
    ],
  },
  {
    group: "Security & data",
    items: [
      {
        q: "Is my data secure?",
        a: "Yes. Zyntai is SOC 2 Type II certified, with encryption in transit and at rest, GDPR compliance, role-based access controls, and optional EU data residency. Payments never touch our servers — they run on Stripe.",
      },
      {
        q: "Who owns the customer data?",
        a: "You do, unambiguously. Your catalog, your customer list, your order history — exportable in full at any time. We never sell data, and we never use your customers to train models for other businesses.",
      },
    ],
  },
];

export const TICKER_ORDERS = [
  { id: "#1042", item: "Pro Plan — annual", meta: "Checkout · Ava", total: "$240.00", status: "New" },
  { id: "#1043", item: "Starter × 3 seats", meta: "Checkout · Marco", total: "$177.00", status: "Processing" },
  { id: "#1044", item: "Consulting block · 5h", meta: "Invoice · Lena", total: "$650.00", status: "New" },
  { id: "#1045", item: "Team workshop pass", meta: "Checkout · Noah", total: "$129.00", status: "Paid" },
  { id: "#1046", item: "Pro Plan — monthly", meta: "Checkout · Mia", total: "$49.00", status: "New" },
  { id: "#1047", item: "Brand kit add-on", meta: "Checkout · Omar", total: "$89.00", status: "Paid" },
];

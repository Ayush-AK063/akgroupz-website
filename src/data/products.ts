// Every in-house product AKgroupz ships lives here. Adding a new one = adding an entry;
// the home page portfolio and the /products/[slug] pages pick it up automatically.

export type ProductStatus = "live" | "building" | "soon";

export type Product = {
  slug: string;
  name: string;
  status: ProductStatus;
  category: string;
  tagline: string;
  summary: string;
  /** Brand colours used for glows and accents on this product's surfaces. */
  colors: { from: string; to: string; glow: string };
  icon?: string;
  logo?: string;
  platforms?: string[];
  storeUrl?: string;
  highlights?: { title: string; body: string }[];
  features?: { icon: string; title: string; body: string }[];
  steps?: { title: string; body: string }[];
};

export const products: Product[] = [
  {
    slug: "clinko",
    name: "Clinko",
    status: "live",
    category: "Mobile app · Rewards & Gaming",
    tagline: "Play. Earn. Redeem.",
    summary:
      "Clinko turns spare minutes into exciting rewards. Players spin, scratch, quiz and compete in quick games, collect coins, climb weekly leaderboards and unlock rewards they'll love.",
    colors: { from: "#a855f7", to: "#7c3aed", glow: "rgba(168,85,247,0.45)" },
    icon: "/clinko/clinko_app_icon.png",
    logo: "/clinko/splash_clinko.png",
    platforms: ["Android"],
    storeUrl: "https://play.google.com/store/apps/details?id=com.clinko.app",
    highlights: [
      { title: "8", body: "skill & luck games in-app" },
      { title: "Daily", body: "bonuses, chests & surprises" },
      { title: "24/7", body: "live ops from our admin console" },
    ],
    features: [
      { icon: "/clinko/spin_wheel.png", title: "Spin & Win", body: "A classic wheel with server-verified outcomes — every spin is fair and auditable." },
      { icon: "/clinko/scratch_card_icon.png", title: "Scratch Cards", body: "Reveal diamonds anytime. Instant, tactile, and genuinely fun." },
      { icon: "/clinko/earn_daily_quiz_icon.png", title: "Daily Quiz", body: "Thousands of fresh questions — general knowledge with an India-first twist." },
      { icon: "/clinko/clinko_latent_icon.png", title: "Clinko Got Latent", body: "Our original guessing game. Nail it exactly or come close — both pay." },
      { icon: "/clinko/tic_tac_toe.png", title: "Tic Tac Toe", body: "Beat the board, collect coins. Simple rules, quick wins." },
      { icon: "/clinko/balloon_pop_icon.png", title: "Balloon Pop", body: "Fast reflex rounds built for one-thumb play." },
      { icon: "/clinko/dice_roll_icon.png", title: "Dice Roll", body: "Roll, predict and stack up your balance." },
      { icon: "/clinko/flip_the_coin_icon.png", title: "Flip the Coin", body: "Heads or tails — the fastest round in the app." },
    ],
    steps: [
      { title: "Play", body: "Pick any of 8 games, daily bonuses or hourly chests." },
      { title: "Earn", body: "Every round adds coins. Invite friends to multiply them." },
      { title: "Redeem", body: "Turn your coins into exciting rewards — the more you play, the more you unlock." },
    ],
  },
  {
    slug: "lab-web",
    name: "Web platform",
    status: "building",
    category: "Web · In the lab",
    tagline: "A new web platform is taking shape.",
    summary:
      "Our next in-house product is a web platform in active development. Same obsession with craft, same focus on things people genuinely enjoy using.",
    colors: { from: "#8b6cff", to: "#ffb547", glow: "rgba(139,108,255,0.35)" },
  },
  {
    slug: "lab-tools",
    name: "Business tools",
    status: "soon",
    category: "SaaS · Exploring",
    tagline: "Tools for growing businesses.",
    summary:
      "We are prototyping software that helps small businesses sell, manage and grow online — built on what we learn delivering client projects.",
    colors: { from: "#34d399", to: "#8b6cff", glow: "rgba(52,211,153,0.3)" },
  },
];

export const liveProducts = products.filter((p) => p.status === "live");

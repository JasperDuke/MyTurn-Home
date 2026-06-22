import { privacyEn } from "./privacy/en";
import { termsEn } from "./terms/en";

export const en = {
  nav: {
    bookDemo: "Book a Demo",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  logo: {
    tagline: "Build the Hype. Hide the Wait.",
  },
  hero: {
    tagline: "Smart queue management",
    title1: "Build the hype.",
    titleHighlight: "Hide the wait.",
    title2: "",
    subtitle:
      "Match the right party to the right table, cut idle gaps, and run peak service with calm, predictable queue flow.",
    startTrial: "View pricing",
    bookDemo: "Book a demo",
    ctaNote: "2-month free trial on your first branch · No credit card",
    trialBadge: "2-Month Free Trial",
  },
  problemSolution: {
    sectionLabel: "The problem",
    title1: "Peak hour breaks when",
    titleHighlight: "space and time misalign",
    problemLabel: "The problem",
    problemTitle: "Three leaks at the door",
    problemDesc:
      "Manual lists and guesswork create friction exactly when every seat counts.",
    problemItems: [
      {
        tag: "Wait times",
        title: "Unpredictable waits",
        text: "Guests bail when estimates feel wrong—before they ever sit down.",
      },
      {
        tag: "Idle gaps",
        title: "Slow turn cycles",
        text: "Minutes lost between “table ready” and the next seating add up fast.",
      },
      {
        tag: "Seating",
        title: "Mismatched parties",
        text: "A two-top at a four-top keeps the line moving but wastes capacity.",
      },
    ],
    solutionLabel: "The solution",
    solutionTitle1: "Operational discipline for",
    solutionHighlight: "every rush",
    solutionDesc:
      "MyTurn is a queue engine for restaurants—not a generic waitlist. Deterministic rules, smart matching, and live floor visibility in one flow.",
    solutionFeatures: [
      {
        title: "Clear queue lifecycle",
        text: "WAITING → CALLED → SEATED → FINISHED with LINE updates and auto no-show handling.",
      },
      {
        title: "Smart table matching",
        text: "Seat the best-fit party the moment a table clears—fewer idle gaps between turns.",
      },
      {
        title: "Live floor visibility",
        text: "Track ready-to-seated time and throughput so every rush gets measurably tighter.",
      },
    ],
  },
  features: {
    sectionLabel: "Core Features",
    title1: "Built for",
    titleHighlight: "peak-hour ops",
    subtitle: "Everything your host stand needs to seat faster, waste fewer tables, and keep guests informed.",
    cards: [
      {
        title: "Deterministic Queue Logic",
        description: "Enforce a structured customer journey (Waiting → Called → Seated → Finished) with automated no-show detection and status syncing.",
        footerLabel: "No-Show Rate",
        footerValue: "-45%",
      },
      {
        title: "Smart Recommendations",
        description: "Instantly suggest the ideal party size the moment a table clears to maximize seat utilization and occupancy.",
        footerLabel: "Utilization",
        footerValue: "98%",
      },
      {
        title: "Idle Gap Analytics",
        description: "Monitor the critical minutes between a table clearing and the next seating to reclaim lost capacity and increase daily turns.",
        footerLabel: "Throughput",
        footerValue: "+18%",
      },
      {
        title: "AI Owner Copilot",
        description: "Unlock predictive staffing alerts, bottleneck forecasting, and automated off-peak LINE promotions.",
        footerLabel: "AI Copilot",
        footerValue: "Pro Tier",
      },
      {
        title: "Queue Autopilot",
        description: "Automate table assignments by letting the system suggest the next optimal party for staff to confirm with a single tap.",
        footerLabel: "Staff taps",
        footerValue: "-80%",
      },
      {
        title: "Get Queue from Home",
        description: "Allow guests to secure a spot in line remotely via mobile web, reducing physical host stand congestion and walkaways.",
        footerLabel: "Status",
        footerValue: "Coming Soon",
      }
    ]
  },
  branchModes: {
    sectionLabel: "Branch floor modes",
    title1: "Fixed tables or",
    titleHighlight: "flexible seating",
    subtitle:
      "Every branch picks one mode at setup—table-mapped discipline or party-first flow for dynamic floors.",
    imageAlt: "MyTurn create-branch screen to choose Fixed mode or Flex mode",
    supportLine:
      "Dynamic seating with no table map? Flex mode keeps your queue structured and efficient—without Autopilot.",
    fixed: {
      badge: "Fixed mode",
      title: "Table map & pax-driven flow",
      description:
        "Table map, split seating, and Autopilot driven by each table's stock and capacity.",
      recommendedLabel: "Recommended for",
      tags: ["Hotpot", "BBQ", "Café"],
      bullets: [
        "Full table mapping tied to party size (pax)",
        "Smart seat matching when tables turn",
        "Queue Autopilot and table-level insights",
      ],
    },
    flex: {
      badge: "Flex mode",
      title: "Party-size queue, dynamic seating",
      description:
        "Party-size queue only—when a table frees, staff seat the next group by headcount (4, 5, 6…) with quick-spot actions.",
      recommendedLabel: "Recommended for",
      tags: ["Hawker", "Stall", "Quick service"],
      bullets: [
        "Queue by party size—no fixed table assignment",
        "Fast call-and-seat workflow for compact floors",
        "Deterministic queue rules without a floor map",
      ],
      note: "Autopilot is not available in Flex mode; you still get an efficient, structured queue system.",
    },
  },
  howItWorks: {
    sectionLabel: "How It Works",
    title1: "4 Steps to",
    titleHighlight: "Total Floor Discipline",
    steps: [
      { title: "Map Your Floor", description: "Quickly layout your table categories and exact capacities in minutes." },
      { title: "Streamline the Queue", description: "Track waiting, dining, and ready states directly from a single intuitive dashboard." },
      { title: "Algorithmic Seating", description: "Let our smart suggestion engine instantly seat the perfect party next." },
      { title: "Capture Wasted Revenue", description: "Review idle gap metrics and unlock hidden capacity during every shift." }
    ]
  },
  globalSupport: {
    sectionLabel: "Global Support",
    title1: "Designed for",
    titleHighlight: "diverse venues",
    subtitle: "Built to support multicultural operators while keeping guest check-ins friction-free.",
    features: [
      {
        title: "Multilingual Operator Panel",
        description: "Staff can manage queues, table layouts, and settings in English, Thai, Simplified Chinese, or Traditional Chinese.",
      },
      {
        title: "Web & LINE QR Check-In",
        description: "Guests scan a QR code to check in instantly via any mobile browser or inside LINE. Zero friction, no app download.",
      },
      {
        title: "Universal Queue Numbers",
        description: "Guest-facing screens and notifications display numbers in English, ensuring clear communication with international tourists.",
      },
    ],
  },
  lineIntegration: {
    sectionLabel: "Customer Communication",
    title1: "Connect on",
    titleHighlight: "LINE",
    subtitle: "Queue updates in LINE—the channel your guests already check all day.",
    features: [
      { title: "Live queue position", description: "Guests see place in line and ready-time estimates." },
      { title: "Built for Thailand", description: "LINE is the default channel—no new habit to learn." },
      { title: "Fewer no-shows", description: "Timely nudges keep parties showing up on time." }
    ]
  },
  onboarding: {
    sectionLabel: "Lightning-Fast Deployment",
    title1: "From Zero to Live in",
    titleHighlight: "10 Minutes",
    subtitle: "Three steps. No IT project. Live before your next rush.",
    steps: [
      {
        title: "Choose Your Layout",
        subtitle: "Table Configuration",
        description:
          "Pick a venue preset (Café, Hotpot, BBQ, Casual) and fine-tune table categories to your floor plan.",
      },
      {
        title: "Set the Rules",
        subtitle: "Hours & Queue Logic",
        description:
          "Set hours, peak modes, and no-show timers—MyTurn handles the rest.",
      },
      {
        title: "Monetize the Idle Screen",
        subtitle: "TV Display Ads",
        description:
          "Play promos on waiting-area TVs when the queue is empty.",
      },
    ],
  },
  vision: {
    sectionLabel: "Our Vision",
    title1: "Beyond the Queue:",
    titleHighlight: "The Future of Operations",
    subtitle:
      "MyTurn is the flagship product of HawDi Technologies. We started by building the operational discipline layer to solve the hardest bottleneck in F&B: peak-hour capacity. But organizing the waitlist is just the foundation.",
    description1:
      "We are actively evolving MyTurn into an intelligent Space-Time Allocation Engine. By leveraging operational data, our upcoming pipeline includes predictive peak-hour staffing analytics, dynamic off-peak demand generation, and an AI-driven Owner Copilot.",
    boldStatement:
      "We don't just manage your data. We are building the intelligence to actively optimize your capacity and throughput in the real world.",
  },
  cta: {
    sectionLabel: "Pricing",
    title1: "Simple Pricing.",
    titleHighlight: "Built to Scale with You.",
    subtitle:
      "Per main branch. Expansion branches have no implementation fee. Save more with semi-annual or annual billing.",
    billingToggleLabel: "Billing period",
    billingMonthly: "Monthly",
    billingSemiAnnual: "Semi-Annual",
    billingSemiAnnualShort: "6 mo",
    billingAnnual: "Annual",
    semiAnnualBadge: "10% off",
    annualBadge: "Best value",
    perMonth: "/ mo",
    mainBranchLabel: "Main branch",
    expansionBranchLabel: "Expansion branch",
    billedYearly: "Billed {total} yearly",
    billedSemiAnnual: "Billed {total} every 6 months",
    savePerYear: "Save {amount} a year",
    savePerPeriod: "Save {amount} every 6 months",
    savePercentBadge: "Save {percent}%",
    setupFeeMonthly: "+ {amount} One-time Setup Fee",
    setupFeeWaived: "$0 Setup Fee",
    viewAllFeatures: "View all features",
    hideFeatures: "Hide features",
    moreFeatures: "+ {count} more features",
    recommendedLabel: "Recommended",
    comingSoonLabel: "Coming Soon",
    guarantee: {
      title: "Risk-Free Founder’s Promise",
      body: "We believe in the power of operational discipline for every rush. If you ever feel that MyTurn is not adding value to your restaurant, we offer a 100% money-back guarantee within the first 30 days. No questions asked. We’re here to help you succeed.",
    },
    plans: {
      foundation: {
        name: "Foundation (Operational Core)",
        badge: "Foundation",
        description:
          "The essential toolkit for managing waitlists and optimizing chair utilization.",
        features: [
          {
            text: "Queue & Flow: Unlimited queues, Deterministic Table Matching, and BYOD hardware support.",
          },
          {
            text: "Customer Comms: LINE & Telegram notifications, plus automated feedback tracking.",
          },
          {
            text: "Advanced Analytics: Nightly breakdown of peak-hour performance and idle gaps.",
          },
          {
            text: "Complete Setup: Custom floor mapping, staff accounts, and 1-on-1 remote training included.",
          },
          { text: "24/7 Support" },
        ],
        recommended: true,
        comingSoon: false,
        ctaLabel: "Book a Demo",
        trialSubtext:
          "Start with Foundation on a 2-month free trial. Implementation fee & subscription apply only if you continue.",
        ctaVariant: "primary" as const,
      },
      pro: {
        name: "Pro (AI Copilot)",
        badge: "AI Powered",
        description:
          "Advanced analytics, predictive staffing, and automated demand generation for busy venues.",
        features: [
          { text: "Everything in Foundation, plus:" },
          {
            text: "Consultant AI & Predictive Forecasting: Smart peak-hour predictions, bottleneck prevention alerts, and data-driven operational suggestions.",
          },
          {
            text: "Predictive Staffing: AI-driven traffic spike alerts for kitchen prep.",
          },
          {
            text: "Dynamic Off-Peak Triggers: Auto-send targeted LINE promotions when tables are empty.",
          },
          { text: "Priority 24/7 Support" },
        ],
        recommended: false,
        comingSoon: true,
        ctaLabel: "Coming Soon",
        trialSubtext: "",
        ctaVariant: "secondary" as const,
      },
    },
  },
  surveyUrgency: {
    ariaLabel: "Restaurant floor survey",
    sectionLabel: "Before you leave",
    titleLine1: "Every rush you run blind",
    titleLine2: "bleeds revenue",
    subtitle:
      "If you won't tell us what breaks at your door, you're choosing to keep losing covers. Two minutes—one honest snapshot of your floor—or keep paying for chaos you never measured.",
    stakes: [
      "Idle gaps you don't track compound into lost covers every peak service",
      "No survey means no tailored fix—we can't show you what you're leaving on the table",
      "Walk away now and competitors tighten flow while you keep guessing",
    ],
    cta: "Take the 2-minute survey now",
    urgencyNote: "Do it now. Waiting is choosing to lose money you can't see yet.",
    contactHint: "Rather talk first? Book a demo below—we'll still ask what's breaking your floor.",
  },
  closingCta: {
    sectionLabel: "Simple, per-branch monthly fee • Unlimited Seats",
    title1: "Ready to stop",
    titleHighlight: "losing capacity?",
    subtitle: "Join top-tier restaurants using MyTurn to squeeze every dollar out of their peak hours.",
    bookDemo: "Book a Demo",
    contactSales: "Contact Sales",
    trialText: "🚀 Start with a 2-month free trial.",
    bullets: ["Unlimited seats & devices", "Cancel anytime", "24/7 priority support"],
  },
  faq: {
    sectionLabel: "FAQ",
    title1: "Frequently Asked",
    titleHighlight: "Questions",
    subtitle: "Quick answers before you start your trial.",
    items: [
      {
        question: "What is the pricing structure?",
        answer:
          "Foundation (Operational Core) starts at $49/mo for your main branch ($39/mo on annual billing). Pro (AI Copilot) starts at $89/mo ($75/mo annually) when available. A one-time $49 Implementation & Training Fee applies to the main branch only—waived on annual plans. Expansion branches have no implementation fee.",
      },
      {
        question: "Is the 2-month trial completely free, or do I pay the implementation fee upfront?",
        answer:
          "Foundation’s 2-month trial is free. You are not charged the $49 Implementation & Training Fee or subscription unless you choose to continue. Annual subscribers also get that fee waived. Cancel during the trial and you pay nothing.",
      },
      {
        question: "Do I need to buy expensive kiosks or hardware?",
        answer:
          "Not at all. MyTurn is completely hardware-agnostic. You can run the dashboard on any existing iPad, Android tablet, or computer. Our waiting area display feature also works directly on any standard Smart TV.",
      },
      {
        question: "Does it support local messaging apps?",
        answer:
          "Yes. MyTurn fully integrates with LINE notifications and web-based queue tracking so customers can monitor their status anywhere, without needing to download a new app.",
      },
      {
        question: "What if a customer doesn't have a smartphone to scan the QR code?",
        answer:
          "No problem. Your host can manually enter their name and party size into the tablet. The customer can then simply relax and watch the waiting area TV display to see when their queue number is called.",
      },
      {
        question: "Can I manage multiple branches?",
        answer:
          "Absolutely. You can manage all your restaurant locations from one centralized master dashboard. Expansion branches are $29/mo on Foundation and $59/mo on Pro (lower on semi-annual and annual billing)—with no implementation fee.",
      },
      {
        question: "Am I locked into a long-term contract?",
        answer:
          "No. MyTurn operates on a simple month-to-month subscription. You can upgrade, add branches, or cancel at any time without penalty.",
      },
    ],
  },
  footer: {
    tagline: "Build the Hype. Hide the Wait. · MyTurn Engine",
    description: "The Peak-Hour Revenue Optimization Engine for busy restaurants. Serve more customers, maximize every hour.",
    companyName: "HawDi Technologies",
    address: "Bangkok, Thailand",
    hawdi: "A product of HawDi Technologies",
    columns: [
      { title: "Product", links: ["Features", "Pricing", "Book a Demo"] },
      { title: "Resources", links: ["Help Center", "API Documentation", "System Status"] },
      { title: "Company", links: ["About Us", "Contact", "Privacy Policy"] }
    ],
    rights: "© 2026 HawDi Technologies. All rights reserved.",
    links: {
      "Features": "Features",
      "How It Works": "How It Works",
      "Pricing": "Pricing",
      "About Us": "About Us",
      "Contact": "Contact",
      "Privacy Policy": "Privacy Policy",
      "Terms of Service": "Terms of Service",
      "Cookie Settings": "Cookie Settings"
    }
  },
  modal: {
    tagline: "Build the Hype. Hide the Wait.",
    title1: "Book a",
    titleHighlight: "Demo",
    subtitle: "See how MyTurn can maximize your table throughput and completely eliminate the idle gap.",
    successTitle: "Request Sent!",
    successDesc: "We'll be in touch shortly to schedule your personalized demo.",
    fullName: "Full Name",
    email: "Work Email",
    restaurant: "Restaurant Name",
    message: "How can we help?",
    submit: "Request Demo",
    error: "Failed to send the request. Please try again later."
  },
  about: {
    sectionLabel: "The Team",
    title1: "Meet the",
    titleHighlight: "Builders",
    subtitle: "We are the founders and engineers obsessed with solving restaurant capacity problems.",
    roles: {
      ceo: "CEO\nFullstack Developer",
      coo: "COO\nTest Automation Lead",
      fullstack_research: "Fullstack Developer\nUX Research",
      fullstack_marketing: "Fullstack Developer\nProduct Marketing",
    },
  },
  privacy: privacyEn,
  terms: termsEn,
};

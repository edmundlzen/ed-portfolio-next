export type ProjectStatus = "live" | "in development" | "on hold" | "deprecated";

export interface ProjectMedia {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  points: string[];
  tech: string[];
  media: ProjectMedia[];
  highlight?: boolean;
}

export const projects: Project[] = [
  {
    slug: "scan-and-go",
    title: "Scan & Go",
    status: "live",
    points: [
      "Cross-platform mobile app that lets shoppers scan items to check prices and build a cart for fast QR-code checkouts.",
      "Freelance project.",
    ],
    tech: ["React Native", "Firebase"],
    media: [
      {
        src: "/projects/scan_and_go/scanner_demo.webm",
        alt: "QR Code Scanner Demo",
      },
      {
        src: "/projects/scan_and_go/auto_locate_demo.webm",
        alt: "Auto Locate closest store Demo",
      },
      {
        src: "/projects/scan_and_go/fast_checkout_demo.webm",
        alt: "Fast checkout via QR Code Demo",
      },
      {
        src: "/projects/scan_and_go/design.png",
        alt: "UI Design created in Lunacy",
      },
    ],
  },
  {
    slug: "pinkfredor-music-player",
    title: "Pinkfredor Music Player",
    status: "deprecated",
    points: [
      "Web app for streaming music straight from your own Google Drive.",
      "Built together with @BenjaminThio and @Tiffceet.",
      "Retired after YouTube Music introduced its own file uploads.",
    ],
    tech: ["React", "Firebase"],
    media: [
      {
        src: "/projects/pinkfredor_music_player/home.png",
        alt: "Home page",
      },
      {
        src: "/projects/pinkfredor_music_player/music_player.png",
        alt: "Music player interface",
      },
    ],
  },
  {
    slug: "healthcare-system",
    title: "Healthcare System",
    status: "live",
    points: [
      "Android app that helps users maintain their health and book appointments with nutritionists.",
      "Freelance project.",
    ],
    tech: ["Android SDK", "Firebase"],
    media: [
      {
        src: "/projects/healthcare_system/home.png",
        alt: "Home",
      },
    ],
  },
  {
    slug: "jawab-my",
    title: "Jawab.my",
    status: "on hold",
    points: [
      "Educational forum where students can ask and answer homework questions.",
      "Personal side project, pending a redesign.",
    ],
    tech: ["Next.js", "tRPC", "Prisma"],
    media: [
      {
        src: "/projects/jawab_my/home.png",
        alt: "Home",
      },
      {
        src: "/projects/jawab_my/question_view.png",
        alt: "Question View",
      },
    ],
  },
  {
    slug: "causeway-vtl",
    title: "Causeway VTL Ticket Info",
    status: "deprecated",
    highlight: true,
    points: [
      "Python bot + scraper that watched Causeway Link for bus tickets and pinged a Telegram group — giving real people a fighting chance against scalper bots.",
      "Over 6,000 subscribers at its peak; retired when the SG–MY travel ban ended.",
      "My proudest and most successful side project.",
    ],
    tech: ["Python", "Telegram"],
    media: [
      {
        src: "/projects/causeway_vtl/messages_view.png",
        alt: "One of the messages of a successfully scraped ticket",
      },
    ],
  },
];

import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";
import { LiveList } from "@liveblocks/client";

// Tiny inline name generator — replaces the faker bundle that used to be
// shipped to every visitor just to pick a random animal name.
const EN_ADJECTIVES = [
  "Swift",
  "Quiet",
  "Golden",
  "Curious",
  "Brave",
  "Cosmic",
  "Gentle",
  "Lucky",
  "Sneaky",
  "Radiant",
];
const EN_ANIMALS = [
  "Fox",
  "Otter",
  "Falcon",
  "Panda",
  "Koala",
  "Lynx",
  "Dolphin",
  "Tiger",
  "Capybara",
  "Penguin",
];
const ZH_ADJECTIVES = [
  "敏捷的",
  "安靜的",
  "好奇的",
  "勇敢的",
  "幸運的",
  "溫柔的",
  "閃亮的",
];
const ZH_ANIMALS = ["狐狸", "水獺", "熊貓", "老虎", "海豚", "企鵝", "貓頭鷹"];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

function randomVisitorName() {
  const isZh =
    typeof navigator !== "undefined" && navigator.language.includes("zh");
  return isZh
    ? `${pick(ZH_ADJECTIVES)}${pick(ZH_ANIMALS)}`
    : `${pick(EN_ADJECTIVES)} ${pick(EN_ANIMALS)}`;
}

export default function IndexRoom({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
      id="index-room"
      initialPresence={{
        cursor: null,
        name: randomVisitorName(),
        typing: false,
      }}
      initialStorage={{
        messages: new LiveList(),
      }}
    >
      {children}
    </RoomProvider>
  );
}

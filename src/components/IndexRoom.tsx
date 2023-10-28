"use client";

import { faker as fakerZh } from "@faker-js/faker/locale/zh_TW";
import { faker as fakerEn } from "@faker-js/faker/locale/en";
import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";
import { LiveList } from "@liveblocks/client";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function IndexRoom({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
      id="index-room"
      initialPresence={{
        cursor: null,
        name: global.navigator
          ? global.navigator.language.includes("zh")
            ? capitalizeFirstLetter(fakerZh.word.adjective()) +
              " " +
              capitalizeFirstLetter(fakerZh.animal.type())
            : capitalizeFirstLetter(fakerEn.word.adjective()) +
              " " +
              capitalizeFirstLetter(fakerEn.animal.type())
          : capitalizeFirstLetter(fakerEn.word.adjective()) +
            " " +
            capitalizeFirstLetter(fakerEn.animal.type()),
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

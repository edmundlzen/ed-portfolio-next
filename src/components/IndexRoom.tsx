"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";

export default function IndexRoom({ children }: { children: ReactNode }) {
  return (
    <RoomProvider
      id="index-room"
      initialPresence={{
        cursor: null,
      }}
    >
      {children}
    </RoomProvider>
  );
}

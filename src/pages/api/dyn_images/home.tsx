import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
          background: "linear-gradient(180deg, #040036 0%, #002022 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            minWidth: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: 756 }).map((_, i) => (
            <div
              key={i}
              style={{
                border: "0.5px solid rgba(255, 255, 255, 0.08)",
                boxSizing: "border-box",
                height: "30px",
                width: "30px",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://edmundlzen.dev/images/infojson.png"
              style={{
                height: "90%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "6rem",
                marginLeft: "2rem",
                color: "white",
              }}
            >
              Edmund&apos;s
              <br />
              <span style={{ color: "#00FFFB" }}>Website</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 630,
    }
  );
}

import { Text, Tooltip } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import ReactTypingEffect from "react-typing-effect";
import { MouseParallaxChild } from "react-parallax-mouse";
import { motion, useInView } from "framer-motion";
import { Cursor, MysteryProjectCard, ProjectCard } from "~/components";
import {
  useMutation,
  useMyPresence,
  useOthers,
  useStatus,
  useStorage,
  useUpdateMyPresence,
} from "liveblocks.config";
import moment from "moment";

const FULL_TITLE = "Edmund's Portfolio";
const CURSOR_COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

function useLiveCursors() {
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    const scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition: { x: number; y: number } | null = null;

    function transformPosition(cursor: { x: number; y: number }) {
      return {
        x: cursor.x / window.innerWidth,
        y: cursor.y,
      };
    }

    function onPointerMove(event: PointerEvent) {
      event.preventDefault();
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;
      updateMyPresence({
        cursor: transformPosition(position),
      });
    }

    function onPointerLeave() {
      lastPosition = null;
      updateMyPresence({ cursor: null });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        updateMyPresence({
          cursor: transformPosition(position),
        });
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [updateMyPresence]);

  const others = useOthers();

  const cursors = [];

  for (const { connectionId, presence } of others) {
    if (presence.cursor) {
      cursors.push({
        x: presence.cursor.x * window.innerWidth,
        y: presence.cursor.y,
        name: presence.name,
        connectionId,
      });
    }
  }

  return cursors;
}

const Home: NextPage = () => {
  const [title, setTitle] = useState("_");
  const [hiMotion, setHiMotion] = useState({
    opacity: 0,
    rotate: 0,
    scale: 0,
  });
  const hiRef = useRef(null);
  const hiIsInView = useInView(hiRef);
  const hiTexts = [
    "Hi!",
    "你好！",
    "Apa khabar?",
    "வணக்கம்",
    "こんにちは",
    "안녕하세요",
  ];
  const [hiText, setHiText] = useState(hiTexts[0]);
  const [imageModalHidden, setImageModalHidden] = useState(true);
  const [imageModalSrc, setImageModalSrc] = useState("");
  const [imageModalDescription, setImageModalDescription] = useState("");
  const [imageModalOpacity, setImageModalOpacity] = useState(0);
  const [messageContent, setMessageContent] = useState("");
  const others = useOthers();
  const cursors = useLiveCursors();
  const [myPresence, updateMyPresence] = useMyPresence();
  const messages = useStorage((root) => root.messages);
  const status = useStatus();
  const bottomChatRef = useRef(null);

  useEffect(() => {
    if (bottomChatRef.current) {
      (bottomChatRef.current as HTMLDivElement).scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [messages]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < FULL_TITLE.length) {
        setTitle(FULL_TITLE.slice(0, i + 1) + "_");
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }, []);

  useEffect(() => {
    // Blink the cursor in the title
    const interval = setInterval(() => {
      setTitle((prev) => (prev.endsWith("_") ? prev.slice(0, -1) : prev + "_"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hiIsInView) {
      setTimeout(() => {
        setHiMotion({
          opacity: 1,
          rotate: 0,
          scale: 1,
        });
      }, 150);
    }
  }, [hiIsInView]);

  useEffect(() => {
    // if (!hiIsInView) return;
    const interval = setInterval(() => {
      setHiMotion({
        opacity: 1,
        rotate: 0,
        scale: 0,
      });
      setTimeout(() => {
        setHiText(
          hiTexts[(hiTexts.indexOf(hiText as string) + 1) % hiTexts.length]
        );
        setHiMotion({
          opacity: 1,
          rotate: 0,
          scale: 1,
        });
      }, 150);
    }, 1500);
    return () => clearInterval(interval);
  }, [hiText, hiIsInView]);

  const setImageModalVisible = () => {
    setImageModalHidden(false);
    setTimeout(() => {
      setImageModalOpacity(1);
    }, 0);
  };

  const setImageModalInvisible = () => {
    setImageModalOpacity(0);
    setTimeout(() => {
      setImageModalHidden(true);
    }, 300);
  };

  const onSendMessage = useMutation(({ storage }, message: string) => {
    storage.get("messages").push({
      name: myPresence.name as string,
      content: message,
      timestamp: Date.now(),
    });
    setMessageContent("");
  }, []);

  return (
    <>
      <Head>
        <title>edmundlzen</title>
        <meta name="description" content="Edmund's portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full flex-col items-start scroll-smooth bg-gradient-to-b from-[#040036] to-[#002022]">
        <div className="min-w-screen absolute top-0 left-0 h-full min-h-screen w-full bg-[url(/images/grid.svg)] bg-repeat" />
        <div
          className={
            "fixed top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-80 p-3 backdrop-blur-sm transition-opacity" +
            (imageModalHidden ? " hidden" : "")
          }
          style={{ opacity: imageModalOpacity }}
          onClick={() => setImageModalInvisible()}
        >
          <div className="h-9/12 relative flex w-9/12 items-center justify-center overflow-hidden lg:h-1/2 lg:w-1/2">
            {imageModalSrc.split(".").pop() === "webm" ? (
              <video
                src={imageModalSrc}
                className="object-fit max-h-full max-w-full"
                style={{
                  borderRadius: "0.5px",
                }}
                autoPlay
                loop
                muted
              />
            ) : (
              <Image
                src={imageModalSrc}
                alt={imageModalDescription}
                fill
                className="object-contain"
              />
            )}
            {/* TODO: Fix this and make the image rounded */}
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            <Text className="text-md text-white">{imageModalDescription}</Text>
          </div>
          <a
            className="text-md mt-2 font-semibold text-sky-400 underline"
            href={imageModalSrc}
            download
          >
            Download image
          </a>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-start">
          <Parallax
            speed={-10}
            className="flex h-screen w-screen shrink-0 snap-start flex-col items-center justify-center text-4xl font-extrabold tracking-tight text-white"
          >
            <MouseParallaxChild factorX={0.1} factorY={0.1}>
              <ReactTypingEffect
                text={["Hi, I'm Edmund"]}
                typingDelay={1000}
                eraseDelay={1000 * 1000}
                speed={50}
                className="flex items-center justify-center"
                displayTextRenderer={(text: string, i: number) => {
                  return (
                    <Text>
                      {text.split("").map((char: string, i: number) => {
                        const key = `${i}`;
                        return <span key={key}>{char}</span>;
                      })}
                    </Text>
                  );
                }}
              />
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: 180,
                  translateY: 500,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  translateY: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.8,
                }}
              >
                <div className="mt-8 w-72 rounded-lg border-[1px] border-black border-opacity-50 bg-slate-900 shadow-xl transition-all">
                  <div className="h-8 w-full rounded-t-lg bg-slate-800">
                    <div className="flex h-8 w-6/12 items-center rounded-t-lg border-2 border-slate-900 border-b-black border-opacity-25 bg-slate-900 px-2 font-mono text-sm">
                      <div className="relative mr-1 h-1/2 w-1/5">
                        <Image
                          src={"/images/json.png"}
                          fill
                          objectFit="contain"
                          alt="JSON Logo"
                          className="invert"
                        />
                      </div>
                      <Text className="font-semibold tracking-normal">
                        info.json
                      </Text>
                    </div>
                  </div>
                  <div className="p-3 font-mono text-sm font-semibold tracking-normal">
                    <div>
                      <span className="text-slate-600">1 </span>
                      {"{"}
                    </div>
                    <div>
                      <span className="text-slate-600">2 </span>
                      <pre className="inline">{"  "}</pre>
                      <span className="text-slate-400">
                        &quot;name&quot;:
                      </span>{" "}
                      <span className="text-lime-400">&quot;Edmund&quot;</span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">4 </span>
                      <pre className="inline">{"  "}</pre>
                      <span className="text-slate-400">
                        &quot;location&quot;:
                      </span>{" "}
                      <span className="text-lime-400">
                        &quot;Malaysia&quot;
                      </span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">5 </span>
                      <pre className="inline">{"  "}</pre>
                      <span className="text-slate-400">
                        &quot;skills&quot;:
                      </span>{" "}
                      <span className="text-slate-300">[</span>
                    </div>
                    <div>
                      <span className="text-slate-600">6 </span>
                      <pre className="inline">{"    "}</pre>
                      <span className="text-orange-500">&quot;HTML&quot;</span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">7 </span>
                      <pre className="inline">{"    "}</pre>
                      <span className="text-blue-500">&quot;CSS&quot;</span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">8 </span>
                      <pre className="inline">{"    "}</pre>
                      <span className="text-yellow-300">
                        &quot;JavaScript&quot;
                      </span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">9 </span>
                      <pre className="inline">{"    "}</pre>
                      <span className="text-blue-400">
                        &quot;TypeScript&quot;
                      </span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">10</span>
                      <pre className="inline">{"    "}</pre>
                      <span className="text-yellow-500">
                        &quot;Python&quot;
                      </span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">11</span>
                      <pre className="inline">{"    "}</pre>
                      <span className="text-sky-300">&quot;React JS&quot;</span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">12</span>
                      <pre className="inline">{"    "}</pre>
                      <span className="text-green-600">
                        &quot;Node JS&quot;
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">13</span>
                      <pre className="inline">{"   "}</pre>
                      <span className="text-slate-300">]</span>
                      {","}
                    </div>
                    <div>
                      <span className="text-slate-600">14</span>
                      <pre className="inline">{"  "}</pre>
                      <span className="text-slate-400">
                        &quot;pain&quot;:
                      </span>{" "}
                      <span className="text-purple-500">true</span>
                    </div>
                    <div>
                      <span className="text-slate-600">15</span>
                      {" }"}
                    </div>
                  </div>
                </div>
              </motion.div>
            </MouseParallaxChild>
          </Parallax>
          <Parallax
            speed={60}
            className="flex min-h-screen snap-center flex-col items-center justify-center gap-y-5 px-4 text-center text-white "
          >
            <MouseParallaxChild factorX={0.1} factorY={0.1}>
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                animate={{
                  opacity: hiMotion.opacity,
                  scale: hiMotion.scale,
                  rotate: hiMotion.rotate,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <h1
                  className="text-4xl font-extrabold tracking-tighter"
                  ref={hiRef}
                >
                  {hiText}
                </h1>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: 90,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.05,
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center"
              >
                <Text className="text-lg">
                  My name is Edmund and I&apos;m a{" "}
                  <span className="font-mono font-semibold text-yellow-300 underline">
                    student
                  </span>{" "}
                  from Johor, Malaysia.
                  <br />
                  <br />I love to create things and I&apos;m always looking for
                  new opportunities to learn and grow! Currently, I&apos;m
                  focusing on{" "}
                  <span className="font-bold text-indigo-500">School</span> .
                </Text>
                <div className="my-1 flex items-center justify-center gap-x-4">
                  <Tooltip label="Github">
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black transition-all hover:scale-125"
                      onClick={() => {
                        window.open("https://github.com/edmundlzen");
                      }}
                    >
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                        alt="Github"
                        className="invert"
                        height={32}
                        width={32}
                      />
                    </button>
                  </Tooltip>
                  {/* <Tooltip label="LinkedIn">
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0274b3] transition-all hover:scale-125"
                      onClick={() => {
                        window.open("https://www.linkedin.com/in/nothx/");
                      }}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                        alt="LinkedIn"
                        className="h-8 w-8"
                      />
                    </button>
                  </Tooltip> */}
                </div>
              </motion.div>
            </MouseParallaxChild>
          </Parallax>
          <Parallax
            speed={60}
            className="flex min-h-screen snap-center flex-col items-center justify-center gap-y-5 px-4 text-center text-white "
          >
            <MouseParallaxChild factorX={0.1} factorY={0.1}>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: 90,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center"
              >
                <div className="flex h-[80vh] w-[90vw] flex-col rounded-lg border-[1px] border-black border-opacity-50 bg-slate-900 shadow-xl transition-all">
                  <div className="h-8 w-full rounded-t-lg bg-slate-800">
                    <div className="flex h-8 w-6/12 items-center justify-start rounded-t-lg border-2 border-slate-900 border-b-black border-opacity-25 bg-slate-900 px-2 font-mono text-sm md:w-4/12">
                      <div className="relative mr-1 h-1/2 w-6">
                        <Image
                          src={"/images/json.png"}
                          fill
                          objectFit="contain"
                          alt="JSON Logo"
                          className="invert"
                        />
                      </div>
                      <Text className="font-semibold tracking-normal">
                        guestbook.txt
                      </Text>
                    </div>
                  </div>
                  <div className="flex h-full flex-col">
                    <div className="flex-1 basis-0 overflow-y-auto">
                      {status !== "connected" ? (
                        <div className="flex h-full items-center justify-center">
                          <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/loading.png"
                            alt="loading"
                            className="animate-spin"
                          />
                        </div>
                      ) : (
                        <div className="h-full">
                          {messages?.slice(-30)?.map((message) => {
                            return (
                              <div
                                key={message.timestamp}
                                className="flex flex-col items-start justify-start p-3 font-mono text-sm font-semibold tracking-normal"
                              >
                                <div className="flex items-center justify-start">
                                  <Text className="text-slate-600">
                                    {message.name}
                                  </Text>
                                  <Text className="text-slate-400">:</Text>
                                </div>
                                <div>
                                  <pre className="inline">{"  "}</pre>
                                  <span className="text-slate-400">
                                    &quot;message&quot;:
                                  </span>{" "}
                                  <span className="text-lime-400">
                                    &quot;{message.content}&quot;
                                  </span>
                                  {","}
                                </div>
                                <div>
                                  <pre className="inline">{"  "}</pre>
                                  <span className="text-slate-400">
                                    &quot;timestamp&quot;:
                                  </span>{" "}
                                  <span className="text-lime-400">
                                    &quot;
                                    {moment(message.timestamp).format(
                                      "DD MMM YYYY HH:mm:ss"
                                    )}
                                    &quot;
                                  </span>
                                  {","}
                                </div>
                              </div>
                            );
                          })}
                          <div ref={bottomChatRef} />
                        </div>
                      )}
                    </div>
                    <div className="relative flex h-16 items-center gap-x-2 bg-slate-800 p-2">
                      <div
                        className="absolute -top-6 -left-[0.05rem] flex h-6 items-center justify-center rounded-tr-lg bg-black bg-opacity-80 font-mono text-sm transition-all"
                        style={{
                          opacity: others.some((other) => other.presence.typing)
                            ? 1
                            : 0,
                        }}
                      >
                        {others.some((other) => other.presence.typing) ? (
                          <div className="px-3">
                            {others
                              .filter((other) => other.presence.typing)
                              .map((other) => other.presence.name)
                              .join(", ") + " is typing..."}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <input
                        className="h-full w-full rounded-full bg-slate-900 bg-opacity-100 p-2 px-4 font-mono outline-none transition-all focus:bg-opacity-80"
                        onFocus={() => {
                          updateMyPresence({
                            typing: true,
                          });
                        }}
                        onBlur={() => {
                          updateMyPresence({
                            typing: false,
                          });
                        }}
                        value={messageContent}
                        onChange={(e) => {
                          setMessageContent(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            onSendMessage(messageContent);
                          }
                        }}
                      />
                      <button
                        className="flex aspect-square h-full select-none items-center justify-center rounded-full bg-slate-900 p-3 transition-all hover:opacity-80 active:scale-95"
                        onClick={() => onSendMessage(messageContent)}
                        disabled={status !== "connected"}
                        style={{
                          pointerEvents:
                            status !== "connected" ? "none" : "auto",
                        }}
                      >
                        {status !== "connected" ? (
                          <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/loading.png"
                            alt="loading"
                            className="animate-spin"
                          />
                        ) : (
                          <img
                            width="24"
                            height="24"
                            src="https://img.icons8.com/material-rounded/24/FFFFFF/sent.png"
                            alt="send"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </MouseParallaxChild>
          </Parallax>
          {/* <Parallax
            speed={60}
            className="flex min-h-screen snap-center flex-col items-center justify-center gap-y-5 px-4 text-center text-white "
          >
            <MouseParallaxChild factorX={0.1} factorY={0.1}>
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: 90,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center"
              >
                <div className="mt-4 flex w-10/12 max-w-4xl flex-col items-start justify-center text-start">
                  <h1 className="mb-4 text-4xl underline underline-offset-4">
                    About me
                  </h1>
                  During my schooling years, me and my friend would often
                  challenge each other to create a website or a game.
                  <br />
                  <br />
                  <span>
                    We would always follow one or two tutorials and then after
                    that didn&apos;t know what to do next.{" "}
                    <span className="font-bold text-red-500">
                      (Tutorial hell)
                    </span>
                  </span>
                  <br />
                  One day, I got annoyed by my other friend constantly telling
                  me to go to a website and starting our Minecraft server and
                  complaining if I didn&apos;t do it fast enough.
                  <br />
                  <br />
                  Since it was free, the server required us to go to a website
                  and manually click a button to start the server every time we
                  wanted to play. And only I had the credentials at the time, so
                  if I wasn&apos;t online, they couldn&apos;t play.
                  <br />
                  <br />
                  I got pretty tired of his complaining and since I was also
                  learning the basics of python at that time, I decided to try
                  and create a bot in our discord server that would
                  automatically start the server for us.
                  <br />
                  <br />
                  After a lot of copying, pasting and googling, I managed to get
                  it working. That was the first time I felt the satisfaction of
                  creating something from scratch. I was hooked.
                  <br />
                  <br />
                  Fast forward to 3 years later, I&apos;m now a software
                  developer and I&apos;m still learning new things everyday.
                </div>
              </motion.div>
            </MouseParallaxChild>
          </Parallax> */}
          <Parallax
            speed={10}
            className="flex min-h-screen snap-end flex-col items-center justify-start gap-y-5 px-4 text-center text-white "
          >
            <MouseParallaxChild factorX={0.1} factorY={0.1}>
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.1,
                }}
                viewport={{ once: true }}
              >
                <h1 className="mt-10 text-4xl font-extrabold tracking-tight md:mb-8 md:text-7xl">
                  Projects
                </h1>
              </motion.div>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ProjectCard
                  title="Scan & Go"
                  status="live"
                  carouselItems={[
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
                  ]}
                  description={
                    <>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; A cross-platform mobile app built using{" "}
                        <span className="font-bold text-blue-400">
                          react-native
                        </span>{" "}
                        &
                        <span className="font-bold text-orange-500">
                          {" "}
                          firebase
                        </span>
                        .
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Allows shoppers to use their phones to scan items
                        to <span className="text-green-400">check prices </span>
                        and add them to a shopping cart for{" "}
                        <span className="text-yellow-300">
                          fast checkouts
                        </span>{" "}
                        by using QR Codes.
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Freelance project
                      </p>
                    </>
                  }
                  onImageClick={(src: string, description: string) => {
                    setImageModalSrc(src);
                    setImageModalDescription(description);
                    setImageModalVisible();
                  }}
                />
                <ProjectCard
                  title="Pinkfredor Music Player"
                  status="deprecated"
                  carouselItems={[
                    {
                      src: "/projects/pinkfredor_music_player/home.png",
                      alt: "Home page",
                    },
                    {
                      src: "/projects/pinkfredor_music_player/music_player.png",
                      alt: "Music player interface",
                    },
                  ]}
                  description={
                    <>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; A web app built using{" "}
                        <span className="font-bold text-sky-500">react</span> &{" "}
                        <span className="font-bold text-orange-500">
                          firebase
                        </span>
                        .
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Allows users to stream music from their{" "}
                        <span className="text-yellow-300">Google Drive</span>{" "}
                        account.
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Collaboration project with developers{" "}
                        <a
                          href="https://github.com/benjaminthio"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400"
                        >
                          @BenjaminThio
                        </a>{" "}
                        &{" "}
                        <a
                          href="https://github.com/Tiffceet"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400"
                        >
                          @Tiffceet
                        </a>{" "}
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; <span className="text-red-500">Deprecated</span>{" "}
                        due to YouTube Music introducing self music file
                        uploading.
                      </p>
                    </>
                  }
                  onImageClick={(src: string, description: string) => {
                    setImageModalSrc(src);
                    setImageModalDescription(description);
                    setImageModalVisible();
                  }}
                />
                <ProjectCard
                  title="Healthcare System"
                  status="live"
                  carouselItems={[
                    {
                      src: "/projects/healthcare_system/home.png",
                      alt: "Home",
                    },
                  ]}
                  description={
                    <>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; An android app built using{" "}
                        <span className="font-bold text-green-500">
                          Android SDK
                        </span>{" "}
                        &{" "}
                        <span className="font-bold text-orange-500">
                          firebase
                        </span>
                        .
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Helps end user{" "}
                        <span className="text-pink-400">
                          maintain their health
                        </span>{" "}
                        and{" "}
                        <span className="text-purple-300">
                          make appointments
                        </span>{" "}
                        with nutritionists.
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Freelance project
                      </p>
                    </>
                  }
                  onImageClick={(src: string, description: string) => {
                    setImageModalSrc(src);
                    setImageModalDescription(description);
                    setImageModalVisible();
                  }}
                />
                <ProjectCard
                  title="Jawab.my"
                  status="on hold"
                  carouselItems={[
                    {
                      src: "/projects/jawab_my/home.png",
                      alt: "Home",
                    },
                    {
                      src: "/projects/jawab_my/question_view.png",
                      alt: "Question View",
                    },
                  ]}
                  description={
                    <>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; A web app built using{" "}
                        <span className="font-bold text-blue-400">Next JS</span>{" "}
                        &{" "}
                        <span className="font-bold text-blue-300">
                          TRPC + Prisma
                        </span>
                        .
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; An{" "}
                        <span className="text-green-400">
                          educational forum
                        </span>{" "}
                        where students can ask and get answers for their
                        homework.
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt;{" "}
                        <span className="text-yellow-400">
                          Pending redesign
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Personal side project
                      </p>
                    </>
                  }
                  onImageClick={(src: string, description: string) => {
                    setImageModalSrc(src);
                    setImageModalDescription(description);
                    setImageModalVisible();
                  }}
                />
                <ProjectCard
                  title="Causeway VTL Ticket Info"
                  highlight
                  status="deprecated"
                  carouselItems={[
                    {
                      src: "/projects/causeway_vtl/messages_view.png",
                      alt: "One of the messages of a successfully scraped ticket",
                    },
                  ]}
                  description={
                    <>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; A python bot + web scraper built using{" "}
                        <span className="font-bold text-yellow-400">
                          Python
                        </span>
                        .
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Scrapes Causeway Link&apos;s website for bus
                        tickets and sends them to a telegram group.
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Gives people a chance to buy tickets and go home
                        despite the dreaded{" "}
                        <span className="text-red-600">scalper bots</span>.
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; At it&apos;s peak, had over{" "}
                        <span className="font-black text-yellow-500">
                          6,000 subscribers
                        </span>
                        .
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; <span className="text-red-500">Deprecated</span>{" "}
                        after travel ban between SG & MY ended.
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        &gt; Personally my proudest & most successful side
                        project.
                      </p>
                    </>
                  }
                  onImageClick={(src: string, description: string) => {
                    setImageModalSrc(src);
                    setImageModalDescription(description);
                    setImageModalVisible();
                  }}
                />
                <MysteryProjectCard />
              </div>
            </MouseParallaxChild>
          </Parallax>
        </div>
      </main>
      {cursors.map(({ x, y, name, connectionId }) => (
        <Cursor
          key={connectionId}
          color={CURSOR_COLORS[connectionId % CURSOR_COLORS.length] || "red"}
          name={name || "Anonymous"}
          x={x}
          y={y}
        />
      ))}
      <motion.div
        className="fixed bottom-3 left-3 flex h-5 items-center gap-x-2 font-mono text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <img
          className="h-5/6"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABl0lEQVR4nO2Wv0oDQRCHY6FBNFErfQCxNDFYi71iJxa24kskWpigEUSUPISSYCfYWIldIsSHiPljKRKrfLIwgbjZ2btogk0+2GbvN7+5nZ3du0hkzJj/BlgHssAjUAfaMuoydwKkhplwB3ghPGVg+y8JV4AHfs89sDxo0j3g02HWBNJAEpiRsQZk5JnNB7AbJuEEcAp0HCZFIOaJjQElR5zxyhlvX9KCUraiGtjv4UpuuHZ6ABe4afpW6vCJAy3F69wWH6KTtrRTxgB4A2pA3sxZmiOP30FXlAC+PMKEZWoS2eQtjWk4jTawakQV/Pwos6zSpuZoNB8VI6qOILHZZx9VI9pUjk+XZIhSnw1Q6g6w0RVeeYQZR3PlZeVacx17/C5ts+chHac54F3xegIm7YAF4FUJKA1wgdwpHlVgXgtckq+LljwesFItaRlYDHrraeBWMWjJ5ZACZmWkZE+18t4Yz6Bq9ZZsXzk6YamJR+AW9SEXQc6zGq0q2UEaUgWIAlvy9TLd3+j59WnIXEE0Ud1pzJjI6PkGDLCOslXUiekAAAAASUVORK5CYII="
        />
        <motion.div
          key={others.length}
          initial={{ color: "rgba(255,0,0,1)" }}
          animate={{ color: "rgba(255,255,255,1)" }}
          transition={{ type: "tween", duration: 1.2 }}
        >
          {others.length + 1}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;

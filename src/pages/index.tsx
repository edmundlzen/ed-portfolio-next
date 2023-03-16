import { Text, Tooltip } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import ReactTypingEffect from "react-typing-effect";
import { MouseParallaxChild } from "react-parallax-mouse";
import { motion, useInView } from "framer-motion";
import { ProjectCard } from "~/components";

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
  const fullTitle = "Edmund's Portfolio";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullTitle.length) {
        setTitle(fullTitle.slice(0, i + 1) + "_");
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

  return (
    <>
      <Head>
        <title>edmundlzen</title>
        <meta name="description" content="Edmund's portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full flex-col items-start scroll-smooth bg-gradient-to-b from-[#040036] to-[#002022]">
        <div className="min-w-screen absolute top-0 left-0 h-full min-h-screen w-full bg-[url(/images/grid.svg)] bg-repeat" />
        <div className="flex h-full w-full flex-col items-center justify-start">
          <Parallax
            speed={-10}
            className="flex h-screen w-screen shrink-0 snap-start flex-col items-center justify-center text-4xl font-extrabold tracking-tight text-white"
          >
            <MouseParallaxChild factorX={0.2} factorY={0.2}>
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
                      <span className="text-slate-600">3 </span>
                      <pre className="inline">{"  "}</pre>
                      <span className="text-slate-400">
                        &quot;age&quot;:
                      </span>{" "}
                      <span className="text-rose-500">17</span>
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
                        &quot;lookingForWork&quot;:
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
            <MouseParallaxChild factorX={0.2} factorY={0.2}>
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
                  delay: 0.1,
                }}
                viewport={{ once: true }}
              >
                <Text className="text-lg tracking-tight">
                  My name is Edmund and I&apos;m a passionate{" "}
                  <span className="font-mono font-semibold text-green-500 underline">
                    software developer
                  </span>{" "}
                  from Johor, Malaysia.
                </Text>
                <div className="mt-4 flex items-center justify-center gap-x-4">
                  <Tooltip label="Github">
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black transition-all hover:scale-125"
                      onClick={() => {
                        window.open("https://github.com/edmundlzen");
                      }}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                        alt="Github"
                        className="h-8 w-8 invert"
                      />
                    </button>
                  </Tooltip>
                  <Tooltip label="LinkedIn">
                    <button
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0274b3] transition-all hover:scale-125"
                      onClick={() => {
                        window.open("https://www.linkedin.com/in/edmundlzen/");
                      }}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                        alt="LinkedIn"
                        className="h-8 w-8"
                      />
                    </button>
                  </Tooltip>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="relative mt-6 flex items-center justify-center gap-x-2 rounded-2xl bg-blue-700 px-4 py-2 text-lg font-semibold text-white transition-all hover:scale-125"
                    onClick={() => {
                      window.open(
                        "https://firebasestorage.googleapis.com/v0/b/personal-41935.appspot.com/o/Edmund's%20resume.pdf?alt=media&token=963b03fb-e4fa-4761-8f95-634f8b2b7b66"
                      );
                    }}
                  >
                    <div className="absolute -z-10 h-8 w-32 animate-ping rounded-2xl bg-blue-500 opacity-90" />
                    <span className="select-none">Download my resume</span>
                  </button>
                </div>
              </motion.div>
            </MouseParallaxChild>
          </Parallax>
          <Parallax
            speed={10}
            className="flex min-h-screen snap-end flex-col items-center justify-start gap-y-5 px-4 text-center text-white "
          >
            <MouseParallaxChild factorX={0.2} factorY={0.2}>
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
                <h1 className="mt-10 text-4xl font-extrabold tracking-tighter">
                  Projects
                </h1>
              </motion.div>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0,
                    rotate: 180,
                    translateX: -100,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    translateX: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    title="Scan & Go"
                    description="A mobile application that allows users to scan and pay for their groceries in a supermarket."
                    image="https://firebasestorage.googleapis.com/v0/b/personal-41935.appspot.com/o/scan_and_go.png?alt=media&token=29a3323b-a109-4a04-860a-c4249274b67a"
                    className="bg-center"
                    github={null}
                  />
                </motion.div>
              </div>
            </MouseParallaxChild>
          </Parallax>
        </div>
      </main>
    </>
  );
};

export default Home;

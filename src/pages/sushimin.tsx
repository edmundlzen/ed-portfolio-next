import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Sushimin: NextPage = () => {
  const [currentSpeaker, setCurrentSpeaker] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const [start, setStart] = useState(false);

  return (
    <>
      <Head>
        <title>LONG LIVE THE SUSHIMIN</title>
        <meta name="description" content="SUSHIMIN" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-screen w-screen">
        {!start ? (
          <div
            className="flex flex h-full w-full cursor-pointer select-none flex-col items-center justify-center bg-black px-4 text-center font-serif text-2xl text-white"
            onClick={() => setStart(true)}
          >
            Benjamin&apos;s Incriminating Confession
            <span className="mt-2 block animate-bounce text-sm">
              (Click anywhere to start)
            </span>
          </div>
        ) : (
          <>
            <div className="absolute -z-50 h-full w-full scale-150 animate-bg bg-[url(/images/sushi_king.png)] bg-[length:80px_60px] bg-repeat" />
            <img
              src="/images/sushimin.png"
              className="absolute left-1/2 bottom-20 z-10 h-full -translate-x-1/2 object-cover"
            />
            <audio
              src="/audio/benjamins_confession.mp3"
              autoPlay
              loop
              className="absolute top-1/2 left-1/2 z-50"
              onTimeUpdate={(e) => {
                const audio = e.target as HTMLAudioElement;
                const currentTime = audio.currentTime;
                console.log(currentTime);
                if (currentTime < 1.42) {
                  setCurrentSpeaker("Benjamin");
                  setCurrentCaption("哼，我认同。");
                } else if (currentTime < 2.3) {
                  setCurrentSpeaker("Yi Fan");
                  setCurrentCaption("蛤？");
                } else if (currentTime < 3.5) {
                  setCurrentSpeaker("Benjamin");
                  setCurrentCaption("我认同。");
                } else if (currentTime < 3.95) {
                  setCurrentSpeaker("Edmund");
                  setCurrentCaption("他讲什么啊？");
                } else if (currentTime < 4.5) {
                  setCurrentSpeaker("Yi Fan");
                  setCurrentCaption("他认同。");
                } else if (currentTime < 5.3) {
                  setCurrentSpeaker("Edmund");
                  setCurrentCaption("你认同什么鬼？");
                } else if (currentTime < 7) {
                  setCurrentSpeaker("Edmund");
                  setCurrentCaption("XX，我刚刚lag着一下。");
                } else if (currentTime < 10) {
                  setCurrentSpeaker("Benjamin");
                  setCurrentCaption("哦哦，【呃呃啊啊啊额】没有没有。");
                } else if (currentTime < 15) {
                  setCurrentSpeaker("Benjamin");
                  setCurrentCaption(
                    "我认同你们你们说的每一句话，我觉得你们说的都是对的。"
                  );
                } else if (currentTime < 22) {
                  setCurrentSpeaker("Benjamin");
                  setCurrentCaption(
                    "OK。其实啊，我每天洗俊宏啊，我每天偷偷暗恋人家（sushi）对对对，都是我的错都是我的错。"
                  );
                } else if (currentTime < 24) {
                  setCurrentSpeaker("Edmund");
                  setCurrentCaption("等一下，偷偷暗恋谁啊？");
                } else if (currentTime < 25) {
                  setCurrentSpeaker("Benjamin");
                  setCurrentCaption("啊？");
                } else if (currentTime < 28) {
                  setCurrentSpeaker("Benjamin");
                  setCurrentCaption("你们不是在讲sushi麽？");
                }
              }}
            />
            <div className="absolute bottom-0 z-50 flex h-1/5 w-full flex-col items-center justify-center bg-black bg-opacity-80 text-center font-mono text-white backdrop-blur">
              <span className="font-semibold">{currentSpeaker}</span>
              {currentCaption.includes("sushi") ? (
                <span className="text-lg">
                  {currentCaption.split("sushi")[0]}
                  <span className="rbt font-serif font-black">sushi</span>
                  {currentCaption.split("sushi")[1]}
                </span>
              ) : (
                <span className="text-lg">{currentCaption}</span>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Sushimin;

import { faker } from "@faker-js/faker";
import moment from "moment";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import letters, { Char } from "~/res/letters";

const TextPanel = (
  props: { letter: Char; color?: "r" | "g" | "y" | "w" } = {
    letter: " ",
    color: "w",
  }
) => {
  const letterMatrix = letters[props.letter];
  return (
    <div className="flex flex-col">
      {letterMatrix.map((row, i) => {
        return (
          <div key={i} className="flex flex-row">
            {row.map((col, j) => {
              return (
                <div
                  key={j}
                  className={`m-[0.08rem] h-4 w-4 rounded-full shadow-inner ${
                    col
                      ? props.color === "r"
                        ? "bg-red-600"
                        : props.color === "g"
                        ? "bg-lime-500"
                        : props.color === "y"
                        ? "bg-yellow-500"
                        : "bg-white"
                      : "bg-zinc-800"
                  }`}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const TextMarquee = (props: {
  text: string;
  color?: "r" | "g" | "y" | "w";
  speed?: number;
  size?: number;
  margin?: number;
  spacing?: number;
  trimUncompletePixels?: boolean;
  moveByWord?: boolean;
  letterPixelSpacing?: number;
}) => {
  const defaultColor = "w";
  const defaultSpeed = 100;
  const defaultSize = 15;
  const defaultMargin = 0.08;
  const defaultSpacing = 5;
  const defaultLetterPixelSpacing = 0;
  const fullText = useMemo(() => {
    return props.text
      .toUpperCase()
      .concat(props.text.charAt(props.text.length - 1) === " " ? "" : " ")
      .split("")
      .map((letter) => {
        return letters[letter as Char];
      })
      .reduce(
        (acc, val) => {
          return acc.map((row, i) => {
            return row.concat(
              (val[i] as number[]).concat(
                Array.from(
                  Array(
                    props.letterPixelSpacing ?? defaultLetterPixelSpacing
                  ).keys()
                ).map(() => 0)
              )
            );
          });
        },
        Array.from(Array(7).keys()).map(() => Array<number>())
      );
  }, [props.text]);
  const [offset, setOffset] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const [pixels, setPixels] = useState<number | undefined>();
  useLayoutEffect(() => {
    const divWidth = outerRef.current?.getBoundingClientRect().width || 0;
    const totalPixelsWithoutSpacing = Math.floor(
      divWidth / ((props.size || defaultSize) + (props.margin ?? defaultMargin))
    );
    const spacing = Math.floor(
      (Math.floor(totalPixelsWithoutSpacing / 5) *
        (props.spacing ?? defaultSpacing)) /
        (props.size || defaultSize)
    );
    const totalPixels =
      totalPixelsWithoutSpacing -
      spacing -
      (props.trimUncompletePixels
        ? (totalPixelsWithoutSpacing - spacing) % 5
        : 0);
    setPixels(totalPixels);
  }, [props.size, props.margin, props.trimUncompletePixels, props.spacing]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((offset) => {
        return props.moveByWord
          ? (offset + 5) % (fullText[0] as number[]).length
          : (offset + 1) % (fullText[0] as number[]).length;
      });
    }, props.speed || defaultSpeed);
    return () => clearInterval(interval);
  }, [fullText, props.speed]);

  return (
    <div className="flex h-fit w-full flex-col" ref={outerRef}>
      {fullText.map((row, i) => {
        return (
          <div key={i} className="flex flex-shrink flex-row">
            {Array.from(Array(pixels).keys()).map((j) => {
              return (
                <>
                  <div
                    key={j}
                    className={`aspect-square rounded-full ${
                      row[(j + offset) % row.length]
                        ? (props.color || defaultColor) === "r"
                          ? "bg-red-600"
                          : (props.color || defaultColor) === "g"
                          ? "bg-lime-500"
                          : (props.color || defaultColor) === "y"
                          ? "bg-yellow-500"
                          : "bg-white"
                        : "bg-zinc-900"
                    }`}
                    style={{
                      height: `${props.size || defaultSize}px`,
                      width: `${props.size || defaultSize}px`,
                      margin: `${props.margin ?? defaultMargin}px`,
                    }}
                  />
                  {(j + 1) % 5 === 0 && (
                    <div
                      key={`${j}-space`}
                      style={{
                        width: `${props.spacing ?? defaultSpacing}px`,
                      }}
                    />
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const TextMarqueeCanvas = (props: {
  text: string;
  color?: "r" | "g" | "y" | "w";
  speed?: number;
  size?: number;
  margin?: number;
  spacing?: number;
  trimUncompletePixels?: boolean;
  moveByWord?: boolean;
  letterPixelSpacing?: number;
  static?: boolean;
  widthTextOnly?: boolean;
  addSpaceAtEnd?: boolean;
}) => {
  const defaultColor = "w";
  const defaultSpeed = 100;
  const defaultSize = 15;
  const defaultMargin = 0.08;
  const defaultSpacing = 5;
  const defaultLetterPixelSpacing = 0;

  const fullText = useMemo(() => {
    return props.text
      .toUpperCase()
      .concat(
        props.addSpaceAtEnd
          ? props.text.charAt(props.text.length - 1) === " "
            ? ""
            : " "
          : ""
      )
      .split("")
      .map((letter) => {
        return letters[letter as Char];
      })
      .reduce(
        (acc, val) => {
          return acc.map((row, i) => {
            if (!val) {
              return row.concat(
                Array.from(
                  Array(
                    props.letterPixelSpacing ?? defaultLetterPixelSpacing
                  ).keys()
                ).map(() => 0)
              );
            }
            return row.concat(
              (val[i] as number[]).concat(
                Array.from(
                  Array(
                    props.letterPixelSpacing ?? defaultLetterPixelSpacing
                  ).keys()
                ).map(() => 0)
              )
            );
          });
        },
        Array.from(Array(7).keys()).map(() => Array<number>())
      );
  }, [props.text]);

  const [offset, setOffset] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<number | undefined>();

  useEffect(
    () => {
      if (props.static) {
        return;
      }
      const interval = setInterval(() => {
        setOffset((offset) => {
          return props.moveByWord
            ? (offset + 5) % (fullText[0] as number[]).length
            : (offset + 1) % (fullText[0] as number[]).length;
        });
      }, props.speed || defaultSpeed);
      return () => clearInterval(interval);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fullText, props.speed]
  );

  useEffect(() => {
    // Listen to outerRef width / height changes and set the canvas width / height
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        canvasRef.current
          ? (canvasRef.current.width = entry.contentRect.width)
          : null;
        canvasRef.current
          ? (canvasRef.current.height = entry.contentRect.height)
          : null;

        // Recalculate pixels
        if (props.widthTextOnly) {
          setPixels(fullText[0]?.length);
          return;
        }
        const divWidth = entry.contentRect.width;
        const totalPixelsWithoutSpacing = Math.floor(
          divWidth /
            ((props.size || defaultSize) + (props.margin ?? defaultMargin) / 2)
        );
        const spacing = Math.floor(
          (Math.floor(totalPixelsWithoutSpacing / 5) *
            (props.spacing ?? defaultSpacing)) /
            (props.size || defaultSize)
        );
        const totalPixels =
          totalPixelsWithoutSpacing -
          (props.trimUncompletePixels
            ? (totalPixelsWithoutSpacing - spacing) % 5
            : 0);
        setPixels(totalPixels);
      });
    });
    resizeObserver.observe(outerRef.current as Element);
    return () => resizeObserver.disconnect();
  }, [canvasRef, outerRef, props.size, props.margin, props.spacing]);

  // Handle setting outerRef height
  useEffect(() => {
    outerRef.current?.style.setProperty(
      "height",
      `${
        7 * (props.size || defaultSize) +
        7 * (props.margin ?? defaultMargin) * 2
      }px`
    );
  }, [pixels, props.size, props.margin, props.spacing]);

  useEffect(() => {
    if (props.widthTextOnly) {
      outerRef.current?.style.setProperty(
        "width",
        `${
          (fullText[0]?.length || 0) * (props.size || defaultSize) +
          (fullText[0]?.length || 0) * (props.margin ?? defaultMargin) +
          Math.floor((fullText[0]?.length || 0) / 5) *
            (props.spacing ?? defaultSpacing)
        }px`
      );
    }
  }, [fullText, props.size, props.margin, props.spacing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fullText.forEach((row, i) => {
        Array.from(Array(pixels).keys()).forEach((j) => {
          if (row[(j + offset) % row.length]) {
            ctx.fillStyle =
              (props.color || defaultColor) === "r"
                ? "#d40102"
                : (props.color || defaultColor) === "g"
                ? "#a2d406"
                : (props.color || defaultColor) === "y"
                ? "#d1ab2d"
                : "#ffffff";
            ctx.beginPath();
            ctx.arc(
              j * (props.size || defaultSize) +
                (j + 1) * (props.margin ?? defaultMargin) +
                Math.floor(j / 5) * (props.spacing ?? defaultSpacing) +
                (props.spacing ?? defaultSpacing) / 2 +
                (props.size || defaultSize) / 2,
              i * (props.size || defaultSize) +
                (i + 1) * (props.margin ?? defaultMargin) +
                (props.size || defaultSize) / 2,
              (props.size || defaultSize) / 2,
              0,
              2 * Math.PI
            );
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(
              j * (props.size || defaultSize) +
                (j + 1) * (props.margin ?? defaultMargin) +
                Math.floor(j / 5) * (props.spacing ?? defaultSpacing) +
                (props.spacing ?? defaultSpacing) / 2 +
                (props.size || defaultSize) / 2,
              i * (props.size || defaultSize) +
                (i + 1) * (props.margin ?? defaultMargin) +
                (props.size || defaultSize) / 2,
              (props.size || defaultSize) / 2,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = "#232323";
            ctx.fill();
          }
        });
      });
    }
  }, [
    fullText,
    offset,
    props.size,
    props.margin,
    props.spacing,
    canvasRef.current?.width,
    canvasRef.current?.height,
    canvasRef.current,
    pixels,
  ]);

  return (
    <div className="flex w-full flex-col" ref={outerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
};

const Test: NextPage = () => {
  const {
    query: { text },
  } = useRouter();

  return (
    <>
      <Head>
        <title>LED Test</title>
        <meta name="description" content="Le LED Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen">
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 gap-x-4 bg-black">
          {/* {Array.from(Array(1).keys()).map((i) => {
          return (
            <TextMarquee
              key={i}
              text={
                "In publishing and graphic design Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content Lorem ipsum may be used as a placeholder before final copy is available"
              }
              color={
                i % 4 === 0 ? "r" : i % 4 === 1 ? "g" : i % 4 === 2 ? "y" : "w"
              }
              size={5}
              margin={0.5}
              speed={50}
            />
          );
        })} */}
          <div className="grid h-screen w-screen auto-rows-auto grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from(Array(30).keys()).map((i) => {
              if (!text) return null;
              return (
                <div key={i} className="flex items-center justify-center">
                  <TextMarqueeCanvas
                    text={
                      text === "country"
                        ? faker.location.country()
                        : (text as string)
                    }
                    color={
                      i % 4 === 0
                        ? "r"
                        : i % 4 === 1
                        ? "g"
                        : i % 4 === 2
                        ? "y"
                        : "w"
                    }
                    size={5}
                    margin={0.5}
                    speed={50}
                    addSpaceAtEnd
                    spacing={0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;

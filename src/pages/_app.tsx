import { type AppType } from "next/dist/shared/lib/utils";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

import "~/styles/globals.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { MouseParallaxContainer } from "react-parallax-mouse";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
      <ParallaxProvider>
        <ChakraProvider>
          <Component {...pageProps} />
          <Analytics />
        </ChakraProvider>
      </ParallaxProvider>
    </MouseParallaxContainer>
  );
};

export default MyApp;

import { type AppType } from "next/dist/shared/lib/utils";
import { ChakraProvider } from "@chakra-ui/react";

import "~/styles/globals.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { MouseParallaxContainer } from "react-parallax-mouse";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
      <ParallaxProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ParallaxProvider>
    </MouseParallaxContainer>
  );
};

export default MyApp;

import { type AppType } from "next/dist/shared/lib/utils";
import { ChakraProvider } from "@chakra-ui/react";

import "~/styles/globals.css";
import { ParallaxProvider } from "react-scroll-parallax";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ParallaxProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ParallaxProvider>
  );
};

export default MyApp;

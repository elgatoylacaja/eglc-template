import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import createEmotionCache from "../src/common/createEmotionCache";
import theme from "../src/common/theme";
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// declare global {
//   interface Window {
//     gtag: any;
//   }
// }

// TODO: Add your Google Analytics 4 ID to the next line.
// const GTAG_ID = "G-XXXXXXXXXX";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     window.gtag("config", GTAG_ID, {
  //       page_path: url,
  //     });
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Overpass+Mono:wght@400;500&family=Source+Serif+Pro:wght@400;700&family=Work+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', GTAG_ID, {
            page_path: window.location.pathname,
          });
        `,
          }}
        /> */}
        {/* <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        /> */}
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

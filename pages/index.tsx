import { useTheme } from "@mui/material";
import { GetStaticProps } from "next";
import Head from "next/head";
import CustomNavMenu from "../src/components/CustomNavMenu";
import DocNavMenu from "../src/components/DocNavMenu";
import RenderSection from "../src/components/RenderSection";
import { getParsedDoc, ParsedDoc } from "../src/utils/archie-ml";

export default function Home({ parsed }: { parsed: ParsedDoc }) {
  const theme = useTheme();

  return (
    <div>
      <Head>
        <title>{parsed.title}</title>
        <meta name="description" content={parsed.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {parsed.navMenu !== undefined ? (
        <DocNavMenu navMenu={parsed.navMenu} />
      ) : (
        <CustomNavMenu />
      )}

      <main>
        {parsed.sections.map((section, i) => {
          return <RenderSection section={section} key={i} />;
        })}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{
  parsed: ParsedDoc;
}> = async () => {
  const parsed = await getParsedDoc(
    "1asLNLwfJ9BobDVTDEDatl3EYMQLccRxNFYTQx_xbFEo"
  );
  return { props: { parsed } };
};

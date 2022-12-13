import { Grid, Typography, useTheme } from "@mui/material";
import { GetStaticProps } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { Block, getParsedDoc, ParsedDoc } from "../src/utils/archie-ml";

const RenderBlock = ({ block }: { block: Block }) => {
  switch (block.key) {
    case "graph": {
      return <span>graph {block.value}</span>;
    }
    case "scrolly": {
      return (
        <div>
          {block.steps.map((step, i) => {
            return (
              <div
                style={{
                  background: "white",
                  padding: "16px 24px",
                  borderRadius: "8px",
                  maxWidth: "400px",
                  border: "1px solid #1d1d1d",
                }}
                key={step.id || i}
              >
                <ReactMarkdown>{step.content}</ReactMarkdown>
              </div>
            );
          })}
        </div>
      );
    }
    case "text": {
      return (
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noreferrer noopener" />
            ),
            h1: ({ node, ...props }) => <Typography variant="h1" {...props} />,
            h2: ({ node, ...props }) => <Typography variant="h2" {...props} />,
            h3: ({ node, ...props }) => <Typography variant="h3" {...props} />,
            h4: ({ node, ...props }) => <Typography variant="h4" {...props} />,
            h5: ({ node, ...props }) => <Typography variant="h5" {...props} />,
            h6: ({ node, ...props }) => <Typography variant="h6" {...props} />,
          }}
        >
          {block.value}
        </ReactMarkdown>
      );
    }
  }
};

const get = (object: Record<string, any>, path: string) => {
  const keys = path.split(".");
  let result = object;
  for (const key of keys) {
    result = result[key];
  }
  return result;
};

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
        <nav
          style={{
            position: "sticky",
            top: 0,
            height: "64px",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "black",
            }}
          ></div>
          <div style={{ display: "flex", gap: "12px" }}>
            {parsed.navMenu.map((item) => {
              return (
                <a
                  key={item.key}
                  href={item.to}
                  target={item.to.startsWith("#") ? "_self" : "_blank"}
                >
                  {item.value}
                </a>
              );
            })}
          </div>
          <div>Share</div>
        </nav>
      ) : (
        <nav>Algo</nav>
      )}

      <main>
        {parsed.sections.map((section, i) => {
          return (
            <section
              id={section.id}
              key={section.id || i}
              style={{
                minHeight: "calc(100vh - 64px)",
                paddingTop: "64px",
                background: section.background?.includes("palette")
                  ? (get(theme, section.background) as unknown as string)
                  : section.background,
              }}
            >
              <Grid container>
                <Grid item xs={1} lg={3}></Grid>
                <Grid item xs={10} lg={6}>
                  <Typography variant="h6">{section.sectionTitle}</Typography>
                  <Typography variant="h1">{section.title}</Typography>
                  {section.blocks.map((block, i) => {
                    return <RenderBlock key={block.id || i} block={block} />;
                  })}
                </Grid>
                <Grid item xs={1} lg={3}></Grid>
              </Grid>
            </section>
          );
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
  console.log(parsed);
  return { props: { parsed } };
};

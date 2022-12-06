import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Block, getParsedDoc, ParsedDoc } from "../src/utils/archie-ml";
import styles from "../styles/Home.module.css";

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
                {step.content}
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
          }}
        >
          {block.value}
        </ReactMarkdown>
      );
    }
  }
};

export default function Home({ parsed }: { parsed: ParsedDoc }) {
  console.log(parsed);
  return (
    <div className={styles.container}>
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

      <main className={styles.main}>
        {parsed.sections.map((section) => {
          return (
            <section id={section.id} style={{ minHeight: "100vh" }}>
              <h6>{section.sectionTitle}</h6>
              <h1>{section.title}</h1>
              {section.blocks.map((block, i) => {
                return <RenderBlock key={block.id || i} block={block} />;
              })}
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

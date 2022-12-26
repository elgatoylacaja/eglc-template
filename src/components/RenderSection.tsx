import { Grid, Hidden, Typography, useTheme } from "@mui/material";
import { get } from "lodash";
import { Section } from "../utils/archie-ml";
import InternalMenu from "./InternalMenu";
import RenderBlock from "./RenderBlock";


export default function RenderSection({ section }: { section: Section }) {
  const theme = useTheme();

  return (
    <section
      id={section.id}
      key={section.id}
      style={{
        // minHeight: "calc(100vh - 64px)",
        paddingTop: "64px",
        background: section.background?.includes("palette")
          ? get(theme, section.background)
          : section.background,
        paddingBottom: "64px",
      }}
    >
      <Hidden lgDown>
        {section.internalMenu !== undefined && (
          <InternalMenu menu={section.internalMenu} />
        )}
      </Hidden>
      <Grid container>
        <Grid item xs={1} lg={3}></Grid>
        <Grid item xs={10} lg={6}>
          <Typography variant="h6">{section.sectionTitle}</Typography>
          <Typography variant="h1">{section.title}</Typography>
          {section.blocks.map((block, i) => (
            <RenderBlock key={block.id || i} block={block} />
          ))}
        </Grid>
        <Grid item xs={1} lg={3}></Grid>
      </Grid>
    </section>
  );
}

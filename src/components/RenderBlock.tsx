import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Block } from "../utils/archie-ml";
import CustomComponent from "./custom";

const Image = styled("img")(({ theme }) => ({
  maxWidth: "min(100%, 600px)",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    maxWidth: "100vw",
  },
}));

const RenderBlock = ({ block }: { block: Block }) => {
  switch (block.key) {
    case "graph-by-id":
    case "scrolly-by-id": {
      return <CustomComponent block={block} />;
    }
    case "text": {
      // TODO: Acá hay que ajustar estilos del theme con como escribimos eso en el doc
      return (
        <div id={block.id}>
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noreferrer noopener" />
              ),
              h1: ({ node, ...props }) => (
                <Typography variant="h1" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <Typography variant="h2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <Typography variant="h3" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <Typography variant="h4" {...props} />
              ),
              h5: ({ node, ...props }) => (
                <Typography variant="h5" {...props} />
              ),
              h6: ({ node, ...props }) => (
                <Typography variant="h6" {...props} />
              ),
              img: ({ node, ...props }) => <Image {...props} />,
              p: ({ node, ...props }) => (
                <Typography variant="body2" {...props} />
              ),
            }}
            rehypePlugins={[rehypeRaw]}
          >
            {block.value}
          </ReactMarkdown>
        </div>
      );
    }
    case "custom-component": {
      return <div>custom component {block.value}</div>;
    }
    default: {
      return <span>Unknown block: {block.key}</span>;
    }
  }
};

export default RenderBlock;

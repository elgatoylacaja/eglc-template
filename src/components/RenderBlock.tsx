import { Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Block } from "../utils/archie-ml";
import CustomComponent from "./custom";

const RenderBlock = ({ block }: { block: Block }) => {
  switch (block.key) {
    case "graph-by-id":
    case "scrolly-by-id": {
      return <CustomComponent block={block} />;
    }
    case "text": {
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
            }}
            rehypePlugins={[rehypeRaw]}
          >
            {block.value}
          </ReactMarkdown>
        </div>
      );
    }
    default: {
      return <span>Unknown block: {block.key}</span>;
    }
  }
};

export default RenderBlock;

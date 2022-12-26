import dynamic from "next/dynamic";
import { GraphBlock, ScrollyBlock } from "../../utils/archie-ml";

const components: Record<string, Record<string, any>> = {
  "scrolly-by-id": {
    "scrolly-with-doc-steps": dynamic(() => import("./ScrollyWithDocSteps"), {
      ssr: false,
    }),
    "scrolly-sample": dynamic(() => import("./ScrollySample"), {
      ssr: false,
    }),
  },
  "graph-by-id": {
    "histogram-sample": dynamic(() => import("./HistogramSample"), {
      ssr: false,
    }),
  },
};

type Props = {
  block: ScrollyBlock | GraphBlock;
};

export default function CustomComponent({ block }: Props) {
  const { key, value } = block;
  switch (key) {
    case "graph-by-id": {
      const Graph = components[key][value];
      if (Graph !== undefined) {
        return (
          <div>
            <Graph />
          </div>
        );
      } else {
        return (
          <div style={{ color: "red" }}>
            {key} - {value} - Not found
          </div>
        );
      }
    }
    case "scrolly-by-id": {
      const { steps } = block;
      const Scrolly = components[key][value];
      if (Scrolly !== undefined) {
        if (steps !== undefined) {
          return <Scrolly steps={steps} />;
        } else {
          return <Scrolly />;
        }
      } else {
        <div style={{ color: "red" }}>
          {key} - {value} - Not found
        </div>;
      }
    }
    default: {
      return (
        <div style={{ color: "red" }}>
          {key} - {value} - Not found
        </div>
      );
    }
  }
}

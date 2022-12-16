import React, { useMemo, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

const DebugOffset = ({ offset }: { offset: number }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        width: "100%",
        height: 0,
        borderTop: "2px dashed black",
        zIndex: 9999,
        top: `${offset * 100}%`,
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontFamily: "monospace",
          margin: 0,
          padding: 6,
        }}
      >
        trigger: {offset}
      </p>
    </div>
  );
};

export type Direction = "up" | "down";

export interface EventParams<T> {
  element: any;
  data: T;
  entry: any;
  direction: Direction;
  scrollamaId: string;
}

export interface ScrollamaProps<T> {
  id: string;
  debug?: boolean;
  children: React.ReactNode;
  offset: number;
  threshold?: number;
  onStepEnter?: (params: EventParams<T>) => void;
  onStepExit?: (params: EventParams<T>) => void;
  onStepProgress?: (params: { progress: number } & EventParams<T>) => void;
}

export interface StepProps<T> {
  children: React.ReactElement;
  data: T;
  handleSetLastScrollTop: (scrollTop: number) => void;
  lastScrollTop: number;
  offset: number;
  scrollamaId: string;
  progressThreshold: number;
  innerHeight: number;
  onStepEnter: (params: EventParams<T>) => void;
  onStepExit: (params: EventParams<T>) => void;
  onStepProgress: (params: { progress: number } & EventParams<T>) => void;
}

const createThreshold = (theta: number, height: number) => {
  const count = Math.ceil(height / theta);
  const t = [];
  const ratio = 1 / count;
  for (let i = 0; i <= count; i += 1) {
    t.push(i * ratio);
  }
  return t;
};

export function Scrollama<T>({
  id,
  children,
  offset,
  onStepEnter = () => {},
  onStepExit = () => {},
  onStepProgress = () => {},
  threshold = 1,
  debug = false,
}: ScrollamaProps<T>) {
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleSetLastScrollTop = (scrollTop: number) => {
    setLastScrollTop(scrollTop);
  };

  const innerHeight = window.innerHeight;

  const offsetValue = offset;

  const progressThreshold = useMemo(
    () => createThreshold(threshold, window.innerHeight),
    []
  );

  return (
    <React.Fragment>
      {debug && <DebugOffset offset={offset} />}
      {React.Children.map(children, (child, i) => {
        return React.cloneElement(child, {
          scrollamaId: `react-scrollama-${id}-${i}`,
          offset: offsetValue,
          onStepEnter,
          onStepExit,
          onStepProgress,
          lastScrollTop,
          handleSetLastScrollTop,
          progressThreshold,
          innerHeight,
        });
      })}
    </React.Fragment>
  );
}

const useRootMargin = (offset: number) => {
  return `-${offset * 100}% 0px -${100 - offset * 100}% 0px`;
};

const useProgressRootMargin = (
  direction: Direction,
  offset: number,
  node: any,
  innerHeight: number
) => {
  if (!node.current) return "0px";
  const offsetHeight = node.current.offsetHeight / innerHeight;
  if (direction === "down")
    return `${(offsetHeight - offset) * 100}% 0px ${offset * 100 - 100}% 0px`;
  return `-${offset * 100}% 0px ${
    offsetHeight * 100 - (100 - offset * 100)
  }% 0px`;
};

type RequireOnly<T, K extends keyof T> = Partial<Omit<T, K>> &
  Required<Pick<T, K>>;

export function Step<T>(props: RequireOnly<StepProps<T>, "data" | "children">) {
  const {} = props;
  const {
    children,
    data,
    handleSetLastScrollTop = () => {},
    lastScrollTop = 0,
    onStepEnter = () => {},
    onStepExit = () => {},
    onStepProgress = () => {},
    offset = 0.3,
    scrollamaId = "",
    progressThreshold,
    innerHeight = 0,
  } = props;

  const scrollTop = document.documentElement.scrollTop;
  const direction = lastScrollTop < scrollTop ? "down" : "up";

  const rootMargin = useRootMargin(offset);

  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const { ref: inViewRef, entry } = useInView({
    rootMargin,
    threshold: 0,
  });

  const progressRootMargin = useMemo(
    () => useProgressRootMargin(direction, offset, ref, innerHeight),
    [direction, offset, ref, innerHeight]
  );

  const { ref: scrollProgressRef, entry: scrollProgressEntry } = useInView({
    rootMargin: progressRootMargin,
    threshold: progressThreshold,
  });

  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
      inViewRef(node);
      scrollProgressRef(node);
    },
    [inViewRef, scrollProgressRef]
  );

  React.useEffect(() => {
    if (scrollProgressEntry !== undefined) {
      if (isIntersecting) {
        const { height, top } =
          scrollProgressEntry.target.getBoundingClientRect();
        const progress = Math.min(
          1,
          Math.max(0, (window.innerHeight * offset - top) / height)
        );
        onStepProgress &&
          onStepProgress({
            progress,
            scrollamaId,
            data,
            element: scrollProgressEntry.target,
            entry: scrollProgressEntry,
            direction,
          });
      }
    }
  }, [scrollProgressEntry]);

  React.useEffect(() => {
    if (entry && !entry.isIntersecting && isIntersecting) {
      onStepExit({
        element: entry.target,
        scrollamaId,
        data,
        entry,
        direction,
      });
      setIsIntersecting(false);
      handleSetLastScrollTop(scrollTop);
    } else if (entry && entry.isIntersecting && !isIntersecting) {
      setIsIntersecting(true);
      onStepEnter({
        element: entry.target,
        scrollamaId,
        data,
        entry,
        direction,
      });
      handleSetLastScrollTop(scrollTop);
    }
  }, [entry, onStepEnter, onStepExit]);

  return React.cloneElement(React.Children.only(children), {
    "data-react-scrollama-id": scrollamaId,
    ref: setRefs,
    entry,
  });
}

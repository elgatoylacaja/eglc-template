import { Grid, styled } from "@mui/material";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ScrollyStep } from "../../utils/archie-ml";
import { EventParams, Scrollama, Step } from "../../utils/scrollytelling";

const ScrollyCard = styled("div")(
  ({ theme }) => `
  background: white;
  padding: 16px 24px;
  border-radius: 8px;
  max-width: 400px;
  border: 1px solid #1d1d1d;
  width: 100%
`
);

const ScrollyWithDocSteps = (props: { steps: ScrollyStep[] }) => {
  const { steps } = props;

  const [currentStep, currentSetStep] = useState(0);

  const onStepEnter = ({ data }: EventParams<number>) => {
    currentSetStep(data);
  };

  return (
    <Grid
      container
      style={{
        margin: "36px 0",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        style={{
          position: "sticky",
          height: "fit-content",
          top: 'calc(64px + 32px)'
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100px",
            border: "1px solid #1d1d1d",
            background: ["blue", "red", "green", "yellow"][currentStep],
          }}
        ></div>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        container
        direction={"column"}
        gap={"25vh"}
        alignItems="center"
      >
        <Scrollama
          id={"scrolly-with-doc-steps"}
          onStepEnter={onStepEnter}
          offset={0.5}
          debug
        >
          {steps.map((step, i) => {
            return (
              <Step data={i} key={step.id || i}>
                <ScrollyCard
                  style={{
                    opacity: currentStep === i ? 1 : 0.2,
                  }}
                >
                  <ReactMarkdown>{step.content}</ReactMarkdown>
                </ScrollyCard>
              </Step>
            );
          })}
        </Scrollama>
      </Grid>
    </Grid>
  );
};

export default ScrollyWithDocSteps;

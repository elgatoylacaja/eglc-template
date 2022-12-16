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
          top: "calc(64px + 32px)",
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
          id={"scrolly-sample"}
          onStepEnter={onStepEnter}
          offset={0.5}
          debug
        >
          <Step data={0}>
            <ScrollyCard
              style={{
                opacity: currentStep === 0 ? 1 : 0.2,
              }}
            >
              Step 0
            </ScrollyCard>
          </Step>
          <Step data={1}>
            <ScrollyCard
              style={{
                opacity: currentStep === 1 ? 1 : 0.2,
              }}
            >
              Step 1
            </ScrollyCard>
          </Step>
          <Step data={2}>
            <ScrollyCard
              style={{
                opacity: currentStep === 2 ? 1 : 0.2,
              }}
            >
              Step 2
            </ScrollyCard>
          </Step>
          <Step data={3}>
            <ScrollyCard
              style={{
                opacity: currentStep === 3 ? 1 : 0.2,
              }}
            >
              Step 3
            </ScrollyCard>
          </Step>
        </Scrollama>
      </Grid>
    </Grid>
  );
};

export default ScrollyWithDocSteps;

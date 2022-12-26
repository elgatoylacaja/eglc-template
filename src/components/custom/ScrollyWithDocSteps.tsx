import { Grid, styled } from "@mui/material";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { ScrollyStep } from "../../utils/archie-ml";
import { EventParams, Scrollama, Step } from "../../utils/scrollytelling";
import { ScrollyCard, ScrollyCardContainer } from "../Scrolly";

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
        alignItems="center"
      >
        <Scrollama
          id={"scrolly-with-doc-steps"}
          onStepEnter={onStepEnter}
          offset={0.5}
        >
          {steps.map((step, i, l) => {
            return (
              <Step data={i} key={step.id || i}>
                <ScrollyCardContainer
                  style={{
                    opacity: currentStep === i ? 1 : 0.2,
                  }}
                >
                  <ScrollyCard>
                    <ReactMarkdown>{step.content}</ReactMarkdown>
                  </ScrollyCard>
                </ScrollyCardContainer>
              </Step>
            );
          })}
        </Scrollama>
      </Grid>
    </Grid>
  );
};

export default ScrollyWithDocSteps;

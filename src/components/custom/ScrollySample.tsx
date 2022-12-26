import { Grid, styled } from "@mui/material";
import { useState } from "react";
import { EventParams, Scrollama, Step } from "../../utils/scrollytelling";
import { ScrollyCard, ScrollyCardContainer } from "../Scrolly";

const sampleSteps = [
  { text: "Step 0", data: 0 },
  { text: "Step 1", data: 1 },
  { text: "Step 2", data: 2 },
  { text: "Step 3", data: 3 },
];

const ScrollySample = () => {
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
      <Grid item xs={12} md={6}>
        <Scrollama
          id={"scrolly-sample"}
          onStepEnter={onStepEnter}
          offset={0.5}
          debug
        >
          {sampleSteps.map((step, index) => (
            <Step data={step.data} key={index}>
              <ScrollyCardContainer
                style={{
                  opacity: currentStep === step.data ? 1 : 0.2,
                  paddingTop: index === 0 ? "0" : "100px",
                  paddingBottom: index === 0 ? "200px" : "100px",
                }}
              >
                <ScrollyCard>{step.text}</ScrollyCard>
              </ScrollyCardContainer>
            </Step>
          ))}
        </Scrollama>
      </Grid>
    </Grid>
  );
};

export default ScrollySample;

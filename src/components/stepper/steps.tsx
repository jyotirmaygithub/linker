import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

// Custom connector to extend the line
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    minHeight: '100px', // Adjust the height here to make the line longer
  },
}));

// Steps with read time and comments
const steps = [
  { readTime: "2 min", comments: "Read" },
  { comments: "Write comment" },
  { comments: "Comments" },
];

export default function OrderProcessStepper() {
  return (
    <div className="fixed right-20 top-40">
      <Stepper
        className="space-y-8"
        orientation="vertical"
        connector={<CustomConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <div>{step.readTime}</div>
              <div className="text-sm" style={{ color: "black" }}>
                {step.comments}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import { sectors } from '@/constants';



const steps = [
  {
    label: 'Informations',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Détails',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Derinère étape',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              {step.label}
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                {index === 0 ? (
                  <form className="flex flex-col gap-4 max-w-[550px]">
                    <TextField type="text" label="Nom" name="name" required={true} variant="outlined" />
                    <TextField type="text" label="Adresse" name="address" required={true} variant="outlined"/>
                    <TextField type="text" label="Ville, commune" name="city" required={true} variant="outlined"/>
                    <TextField type="text" label="Lieu(x) de production et/ou de transformation" name="productionPlace" required={true} variant="outlined"/>
                  </form>
                ) : (
                  <></>
                )}

                {index === 1 ? (
                  <form>
                    <div>
                        <CheckboxGroup
                        label="Secteur(s)"
                        className="max-h-[200px] overflow-y-scroll"
                        >
                            {sectors.map((sector, index) => (
                                <Checkbox key={index} value={sector.value}>{sector.label}</Checkbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                  </form>
                ) : (
                  <></>
                )}
                
                <div>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Terminer' : 'Suivant'}
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Votre commerce</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
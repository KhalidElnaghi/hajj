import * as React from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';

import { useTranslations } from 'next-intl';

const steps = [
  'Refused',
  'Pending',
  'InProgress',
  'DeliveryReady',
  'DeliveryInProgress',
  'DeliveryDone',
];

export default function HorizontalStepper({ activeStep }: { activeStep: string }) {
  const t = useTranslations();
  const activeStepIndex = steps.indexOf(activeStep);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
      <Stepper activeStep={activeStepIndex} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ minWidth: '130px' }}>{t(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

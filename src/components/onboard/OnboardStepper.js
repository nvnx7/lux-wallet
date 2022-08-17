import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { ImportForm, NewWalletForm } from 'components/wallet';
import GetStarted from './GetStarted';

const OnboardStepper = ({ ...props }) => {
  const [step, setStep] = useState(0);

  return (
    <Box {...props}>
      {step === 0 && <GetStarted />}
      {step === 1 && <NewWalletForm />}
      {step === 2 && <ImportForm />}
    </Box>
  );
};

export default OnboardStepper;

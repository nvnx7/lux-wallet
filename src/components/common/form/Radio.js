import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  RadioGroup,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';

const FormRadioGroup = ({
  name,
  label,
  control,
  helperText,
  isRequired,
  isInvalid,
  _radioGroup,
  children,
  ...props
}) => {
  const { field, formState } = useController({ name, control });
  const error = formState?.errors?.[name]?.message;

  return (
    <FormControl pb={2} isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel>{label}</FormLabel>

      <RadioGroup
        name={name}
        onChange={v => field.onChange(v)}
        value={field.value}
        {..._radioGroup}
      >
        {children}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
export default FormRadioGroup;

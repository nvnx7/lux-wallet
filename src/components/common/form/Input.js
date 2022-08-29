import { FormControl, Input, FormLabel, FormHelperText, FormErrorMessage } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const FormInput = ({
  name,
  label,
  control,
  placeholder,
  type = 'text',
  defaultValue = '',
  helperText,
  isRequired,
  isInvalid,
  disabled = false,
  _input,
  ...props
}) => {
  const { t } = useTranslation();
  const { field, formState } = useController({ name, control, defaultValue });
  const error = formState?.errors?.[name]?.message;

  return (
    <FormControl pb={2} isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        onBlur={field.onBlur}
        placeholder={placeholder}
        onChange={val => field.onChange(val)}
        value={field.value}
        disabled={disabled}
        {..._input}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{t(error)}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;

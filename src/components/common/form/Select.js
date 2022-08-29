import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const FormSelect = ({
  name,
  label,
  control,
  placeholder,
  isRequired,
  defaultValue = '',
  options = [],
  disabled = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { field, formState } = useController({ name, control, defaultValue });
  const error = formState?.errors?.[name]?.message;

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel>{label}</FormLabel>
      <Select
        placeholder={placeholder}
        value={field.value}
        onChange={e => field.onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{t(error)}</FormErrorMessage>
    </FormControl>
  );
};

export default FormSelect;

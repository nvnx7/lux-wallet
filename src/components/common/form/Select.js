import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

const FormSelect = ({
  name,
  label,
  control,
  placeholder,
  isRequired,
  defaultValue = '',
  options = [],
  ...props
}) => {
  const { field, formState } = useController({ name, control, defaultValue });
  const error = formState?.errors?.[name]?.message;

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel>{label}</FormLabel>
      <Select
        placeholder={placeholder}
        value={field.value}
        onChange={e => field.onChange(e.target.value)}
      >
        {options.map(opt => (
          <option value={opt.value}>{label}</option>
        ))}
      </Select>
      {/* <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select
              onValueChange={(val) => field.onChange(val)}
              selectedValue={field.value}
              accessibilityLabel={placeholder}
              placeholder={placeholder}
            >
              {options.map((option) => (
                <Select.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Select>
          )}
        /> */}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormSelect;

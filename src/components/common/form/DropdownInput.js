import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  VStack,
  Text,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { useController } from 'react-hook-form';

const FormDropdownInput = ({
  name,
  label,
  control,
  placeholder,
  helperText,
  defaultValue,
  isRequired,
  options = [],
  _input,
  ...props
}) => {
  const { field, formState } = useController({ name, control, defaultValue });
  const error = formState?.errors?.[name]?.message;

  const handleSelect = e => {
    field.onChange(e.item?.value);
  };
  const handleChange = e => {
    field.onChange(e.target.value);
  };

  return (
    <FormControl pb={2} isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel>{label}</FormLabel>
      <AutoComplete
        onSelectOption={handleSelect}
        listAllValuesOnFocus={true}
        openOnFocus={true}
        value={field.value}
        rollNavigation
      >
        <AutoCompleteInput
          placeholder={placeholder}
          value={field.value}
          onChange={handleChange}
          onBlur={field.onBlur}
          {..._input}
        />
        <AutoCompleteList>
          {options.map(opt => (
            <AutoCompleteItem
              key={opt.value}
              value={opt.value}
              label={opt.label}
              overflowX="hidden"
            >
              <VStack spacing={0} alignItems="start">
                <Text fontSize="xs" variant="body">
                  {opt.label}
                </Text>
                <Text fontSize="sm">{opt.value}</Text>
              </VStack>
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormDropdownInput;

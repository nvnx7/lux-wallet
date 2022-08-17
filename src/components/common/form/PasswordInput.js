import {
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const FormPasswordInput = ({
  name,
  label,
  control,
  placeholder,
  defaultValue = '',
  helperText,
  isRequired,
  isInvalid,
  _input,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const { field, formState } = useController({ name, control, defaultValue });
  const error = formState?.errors?.[name]?.message;

  return (
    <FormControl pb={2} isRequired={isRequired} isInvalid={!!error} {...props}>
      <FormLabel fontWeight="medium">{label}</FormLabel>
      <InputGroup>
        <Input
          type={show ? 'text' : 'password'}
          onBlur={field.onBlur}
          placeholder={placeholder}
          onChange={val => field.onChange(val)}
          value={field.value}
          {..._input}
        />
        <InputRightElement>
          <IconButton
            size="md"
            variant="ghost"
            icon={show ? <RiEyeOffLine /> : <RiEyeLine />}
            onClick={handleShow}
          />
        </InputRightElement>
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormPasswordInput;

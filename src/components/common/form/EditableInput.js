import { HStack, IconButton, Input, Text } from '@chakra-ui/react';
import { CheckIcon, EditIcon } from 'components/icons';
import { useState } from 'react';

function EditableInput({ input = {}, text = {}, value, onSubmit, ...props }) {
  const [editMode, setEditMode] = useState(false);
  const [val, setValue] = useState(value);

  const handleSubmit = () => {
    setEditMode(false);
    onSubmit && onSubmit(val);
  };

  return (
    <HStack w="60%" justify="center" {...props}>
      {editMode ? (
        <>
          <Input
            size="sm"
            textAlign="center"
            value={val}
            onChange={e => setValue(e.target.value)}
            {...input}
          />
          <IconButton size="sm" icon={<CheckIcon />} variant="ghost" onClick={handleSubmit} />
        </>
      ) : (
        <>
          <Text textAlign="center" {...text}>
            {value}
          </Text>
          <IconButton
            size="sm"
            icon={<EditIcon />}
            variant="ghost"
            onClick={() => setEditMode(true)}
          />
        </>
      )}
    </HStack>
  );
}

export default EditableInput;

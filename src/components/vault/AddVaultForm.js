//TODO: Purge
// import { Button, Heading, HStack, Switch, Text, VStack } from '@chakra-ui/react';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from 'react-hook-form';
// import { FormInput } from 'components/common/form';
// import { logDebug, logError } from 'utils/logger';
// import { useTranslation } from 'react-i18next';
// import { useAccount } from 'contexts/accounts';
// import { ModalView, useUI } from 'contexts/ui';

// const schema = yup.object().shape({
//   address: yup
//     .string()
//     .matches(/^(0x)?([A-Fa-f0-9]{40})$/, 'Invalid address')
//     .required('Required'),
//   label: yup.string(),
// });
// const resolver = yupResolver(schema);

// const AddVaultForm = ({ ...props }) => {
//   const { activeAccount } = useAccount();
//   const { t } = useTranslation();
//   const { setModalView } = useUI();
//   const { control, handleSubmit } = useForm({
//     resolver,
//     defaultValues: { label: `Vault ${activeAccount?.length || 1}` },
//   });

//   const onSubmit = data => {
//     logDebug('AddVaultForm:onSubmit', data);
//   };

//   const handleCreateNew = () => {
//     setModalView(ModalView.CREATE_VAULT);
//   };

//   return (
//     <VStack as="form" onSubmit={handleSubmit(onSubmit)} {...props}>
//       <Heading fontWeight="semibold" fontSize="md">
//         {t('form:add-existing-vault')}
//       </Heading>

//       <FormInput label={t('form:vault-label')} name="label" control={control} />
//       <FormInput label={t('form:vault-address')} name="address" control={control} />

//       <VStack>
//         <Button type="submit" mt={4}>
//           {t('form:add-vault')}
//         </Button>
//         <HStack>
//           <Text variant="body">{t('form:dont-have-vault')}</Text>
//           <Button variant="link" color="gray.500" fontSize="sm" onClick={handleCreateNew}>
//             {t('form:create-new')}
//           </Button>
//         </HStack>
//       </VStack>
//     </VStack>
//   );
// };

// export default AddVaultForm;

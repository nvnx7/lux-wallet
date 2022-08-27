import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import {
  AccountDetails,
  CreateAccountForm,
  ImportAccountForm,
  RemoveAccountForm,
} from 'components/account';
import { ImportLegacyAssetForm } from 'components/digital-asset/legacy';
import { CreateVaultForm } from 'components/vault';
import { ModalView, useUI } from 'contexts/ui';

/**
 * A single Modal component that is used at multiple
 * places throughout the app rather than creating a modal component
 * for every use case. Works like charm in tandem with useUI()
 */
const ManagedModal = () => {
  const { isModalOpen, closeModal, modalView: view } = useUI();
  return (
    <Modal
      size="sm"
      closeOnOverlayClick={false}
      isCentered
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      <ModalOverlay backdropFilter="auto" backdropInvert="20%" backdropBlur="4px" />
      <ModalContent borderRadius={24} bg="blackAlpha.800" maxW={380}>
        <ModalCloseButton />
        <ModalBody px={6} py={8}>
          {view === ModalView.CREATE_VAULT && <CreateVaultForm />}
          {view === ModalView.ACCOUNT_DETAILS && <AccountDetails />}
          {view === ModalView.CREATE_ACCOUNT && <CreateAccountForm />}
          {view === ModalView.IMPORT_ACCOUNT && <ImportAccountForm />}
          {view === ModalView.DELETE_ACCOUNT && <RemoveAccountForm />}
          {view === ModalView.IMPORT_LEGACY_TOKEN && <ImportLegacyAssetForm />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManagedModal;

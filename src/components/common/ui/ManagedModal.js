import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { AccountDetails, CreateAccountForm, ImportAccountForm } from 'components/account';
import { CreateVaultForm } from 'components/vault';
import { ModalView, useUI } from 'contexts/ui';

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
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent borderRadius={24}>
        <ModalCloseButton />
        <ModalBody px={6} py={8}>
          {view === ModalView.CREATE_VAULT && <CreateVaultForm />}
          {view === ModalView.ACCOUNT_DETAILS && <AccountDetails />}
          {view === ModalView.CREATE_ACCOUNT && <CreateAccountForm />}
          {view === ModalView.IMPORT_ACCOUNT && <ImportAccountForm />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ManagedModal;

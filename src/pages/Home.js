import { BottomNavLayout } from 'components/layout';
// import UniversalProfile from 'components/profile/UniversalProfile';

// import { AssetList, AssetTabs } from 'components/digital-asset';
import { AccountView } from 'components/account';
// import {
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
// } from '@chakra-ui/react';

const Home = () => {
  return (
    <BottomNavLayout>
      <AccountView />
      {/* <UniversalProfile /> */}
      {/* <AssetList mx={4} /> */}
      {/* <AssetTabs /> */}
      {/* <BasicUsage /> */}
    </BottomNavLayout>
  );
};

// function BasicUsage() {
//   // const { isOpen, onOpen, onClose } = useDisclosure();
//   return (
//     <>
//       {/* <Button onClick={onOpen}>Open Modal</Button> */}

//       <Modal isOpen={true} size="sm">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quidem, quidem quidem
//             quidem quidem quidem quidem quidem quidem
//           </ModalBody>

//           <ModalFooter>
//             Close
//             {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
//             </Button>
//             <Button variant='ghost'>Secondary Action</Button> */}
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
export default Home;

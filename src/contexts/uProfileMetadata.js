// import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
// import { useAccount } from './accounts';
// import { useGetUniversalProfileMetadata } from 'api/profile/getUniversalProfile';
// import { formatLSP3Metadata } from 'utils/erc725';

// const initialState = {
//   profile: null,
// };

// const UProfileMetadataContext = createContext(initialState);
// UProfileMetadataContext.displayName = 'UProfileMetadataContext';

// export const UProfileMetadataProvider = ({ children }) => {
//   const [metadata, setMetadata] = useState(initialState);
//   const { account } = useAccount();
//   const { data, isLoading, isError } = useGetUniversalProfileMetadata({
//     profileAddress: account?.address,
//   });

//   useEffect(() => {
//     if (!data) return;
//     setMetadata(formatLSP3Metadata(data));
//   }, [data]);

//   const value = useMemo(
//     () => ({
//       ...metadata,
//       isLoading,
//       isError,
//     }),
//     [metadata, isLoading, isError]
//   );

//   return (
//     <UProfileMetadataContext.Provider value={value}>{children}</UProfileMetadataContext.Provider>
//   );
// };

// export const useUProfileMetadata = () => {
//   const context = useContext(UProfileMetadataContext);
//   if (context === undefined) {
//     throw new Error('useUProfileMetadata must be used in UProfileMetadataProvider');
//   }
//   return context;
// };

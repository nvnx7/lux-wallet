import { useQuery } from 'react-query';
import UProfile from 'api/utils/erc725';
import { formatLSP3Metadata } from 'utils/erc725';

const getUniversalProfileMetadata = async ({ profileAddress }) => {
  const profile = UProfile.getInstance(profileAddress);
  const data = await profile.fetchData();
  const profileData = formatLSP3Metadata(data);
  return profileData;
};

export const useGetUniversalProfileMetadata = ({ profileAddress }) => {
  return useQuery(
    ['LSP3UniversalProfileMetadata', { profileAddress }],
    () => getUniversalProfileMetadata({ profileAddress }),
    {
      enabled: !!profileAddress,
    }
  );
};

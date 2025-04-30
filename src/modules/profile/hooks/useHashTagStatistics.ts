import { useLoadTagsWithNotesQuery } from '../../hashTags/api/hashTagsApi';

import { useAppDispatch } from '../../common/stores/hooks';

export const useHashTagStatistics = (limit = 10) => {
  const { data } = useLoadTagsWithNotesQuery({ limit });

  return {
    data,
  };
};

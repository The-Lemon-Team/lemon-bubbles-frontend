import { useState } from 'react';

const INITIAL_PAGE = 1;
const INITIAL_SKIP = 10;

export const useInfiniteAssets = (
  initialPage = INITIAL_PAGE,
  initialLimit = INITIAL_SKIP,
) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  return {
    page,
    limit,

    setPage,
    setLimit,
  };
};

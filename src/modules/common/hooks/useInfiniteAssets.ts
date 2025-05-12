import { useState } from 'react';

const INITIAL_PAGE = 1;
const INITIAL_SKIP = 10;

export const useInfiniteAssets = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(INITIAL_SKIP);

  return {
    page,
    limit,

    setPage,
    setLimit,
  };
};

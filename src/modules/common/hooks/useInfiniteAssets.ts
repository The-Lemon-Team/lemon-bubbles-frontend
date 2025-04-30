import { useState } from 'react';

const INITIAL_SKIP = 0;
const INITIAL_TAKE = 10;

export const useInfiniteAssets = () => {
  const [take, setTake] = useState(INITIAL_TAKE);
  const [skip, setSkip] = useState(INITIAL_SKIP);

  return {
    take,
    skip,

    setTake,
    setSkip,
  };
};

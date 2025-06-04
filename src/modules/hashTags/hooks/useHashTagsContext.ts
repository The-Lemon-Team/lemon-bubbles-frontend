import { useContext } from 'react';

import { HashTagsContext } from '../containers';

export const useHashTagsContext = () => useContext(HashTagsContext);

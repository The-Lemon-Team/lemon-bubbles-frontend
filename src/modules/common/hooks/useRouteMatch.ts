import { useMatch } from 'react-router-dom';

export const useRouteMatch = (path: string) => {
  const match = useMatch(path);

  return match?.pathname === path;
};

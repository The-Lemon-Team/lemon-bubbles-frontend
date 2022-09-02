import { setupDevServer } from './modules/common/api/dev/devServer';

// const isDevServer = process.env.REACT_APP_DEV_SERVER === 'true';
// const isDevEnv = process.env.NODE_ENV === 'development';

export const setupUtils = () => {
  // if (isDevEnv && isDevServer) {
  setupDevServer();
  // }
};

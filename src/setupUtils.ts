import { setupDevServer } from './modules/common/api/dev/devServer';

export const setupUtils = () => {
  const isDevServerEnabled = process.env.DEV_SERVER === 'true';
  const isDevEnv = process.env.NODE_ENV === 'development';

  if (isDevEnv && isDevServerEnabled) {
    setupDevServer();
  }
};

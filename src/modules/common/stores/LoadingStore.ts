import { types } from 'mobx-state-tree';

export const LoadingStore = types
  .model('LoadingStore', {
    status: types.maybeNull(
      types.enumeration('status', ['loading', 'error', 'success']),
    ),
  })
  .views((self) => ({
    getStatus() {
      return self.status;
    },
    get isLoading() {
      return self.status === 'loading';
    },
    get error() {
      return self.status === 'error';
    },
  }))
  .actions((self) => ({
    setLoading() {
      self.status = 'loading';
    },
    setError() {
      self.status = 'error';
    },
    setSucceed() {
      self.status = 'success';
    },
  }));

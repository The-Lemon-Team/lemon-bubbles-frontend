import { ResizerStore } from './ResizerStore';

describe('ResizerStore', () => {
  it('should check initial values, default values', () => {
    const resizerStore = ResizerStore.create({
      width: 0,
      height: 0,
    });
    const resizerStoreWithEmptyData = ResizerStore.create();

    expect({
      width: resizerStore.width,
      height: resizerStore.height,
    }).toEqual({ width: 350, height: 350 });
    expect({
      width: resizerStoreWithEmptyData.width,
      height: resizerStoreWithEmptyData.height,
    }).toEqual({ width: 350, height: 350 });
  });

  it('should check initial values by getSizes selector', () => {
    const resizerStore = ResizerStore.create();

    expect(resizerStore.getSizes()).toEqual({ width: 350, height: 350 });
  });

  describe('Persistance tests', () => {
    afterAll(() => {
      localStorage.removeItem('floatingList_sizes');
    });

    it('should restore from local storage', () => {
      localStorage.setItem(
        'floatingList_sizes',
        JSON.stringify({ width: 350, height: 350 }),
      );

      const resizerStoreWithEmptyData = ResizerStore.create();

      expect(resizerStoreWithEmptyData).toEqual({ width: 350, height: 350 });
    });

    it('should save store to location storage', () => {
      const resizerStore = ResizerStore.create();

      resizerStore.setSizes(100, 200);

      expect(
        JSON.parse(localStorage.getItem('floatingList_sizes') || ''),
      ).toEqual({
        width: 100,
        height: 200,
      });
    });
  });

  describe('test actions', () => {
    it('setSizes', () => {
      const resizerStore = ResizerStore.create();

      resizerStore.setSizes(100, 200);

      expect(resizerStore.getSizes()).toEqual({
        width: 100,
        height: 200,
      });
    });
  });
});

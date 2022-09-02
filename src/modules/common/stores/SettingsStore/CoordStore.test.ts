import { CoordStore } from './CoordStore';

describe('CoordStore', () => {
  it('should check initial values, default values', () => {
    const coordStore = CoordStore.create({
      x: 0,
      y: 0,
    });
    const coordStoreWithEmptyData = CoordStore.create();

    expect({
      x: coordStore.x,
      y: coordStore.y,
    }).toEqual({ x: 300, y: 150 });
    expect({
      x: coordStoreWithEmptyData.x,
      y: coordStoreWithEmptyData.y,
    }).toEqual({ x: 300, y: 150 });
  });

  it('should check initial values by getCoordinates selector', () => {
    const coordStore = CoordStore.create();

    expect(coordStore.getCoordinates()).toEqual({ x: 300, y: 150 });
  });

  describe('Persistance tests', () => {
    afterAll(() => {
      localStorage.removeItem('floatingList_coordinates');
    });

    it('should restore from local storage', () => {
      localStorage.setItem(
        'floatingList_coordinates',
        JSON.stringify({ x: 50, y: 250 }),
      );

      const coordStoreWithEmptyData = CoordStore.create();

      expect(coordStoreWithEmptyData).toEqual({ x: 50, y: 250 });
    });

    it('should save store to location storage', () => {
      const coordStore = CoordStore.create();

      coordStore.setCoordinates(100, 200);

      expect(
        JSON.parse(localStorage.getItem('floatingList_coordinates') || ''),
      ).toEqual({
        x: 100,
        y: 200,
      });
    });
  });

  describe('test actions', () => {
    it('setCoordinates', () => {
      const coordStore = CoordStore.create();

      coordStore.setCoordinates(100, 200);

      expect(coordStore.getCoordinates()).toEqual({
        x: 100,
        y: 200,
      });
    });
  });
});

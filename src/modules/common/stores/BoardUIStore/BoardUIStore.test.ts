import { BoardUIStore } from './BoardUIStore';
import { ThemeMode } from '../../../../enums';
import { coordinates, sizes, featureFlags } from '../appDefaults';

describe('BoardUIStore', () => {
  it('test initial values', () => {
    const boardUiStore = BoardUIStore.create({
      featureFlags: {
        features: featureFlags,
      },
      floatingList: {
        position: coordinates,
        sizes: sizes,
      },
      themeStore: {
        mode: ThemeMode.DARK,
      },
    });
    const plainStore = JSON.parse(JSON.stringify(boardUiStore));

    expect(plainStore).toEqual({
      floatingList: {
        position: { x: 300, y: 150 },
        sizes: { width: 350, height: 350 },
      },
      themeStore: { mode: 'dark' },
      featureFlags: { features: { floatingWindow: false } },
    });
  });
});

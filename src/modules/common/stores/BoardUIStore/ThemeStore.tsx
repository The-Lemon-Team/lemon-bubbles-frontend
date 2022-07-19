export const ThemeStore = types.snapshotProcessor(
  types
    .model('ThemeStore', {
      mode: types.enumeration<ThemeMode>('ThemeMode', Object.values(ThemeMode)),
    })
    .views((self) => ({
      get isLightMode() {
        return self.mode === ThemeMode.LIGHT;
      },
      get isDarkMode() {
        return self.mode === ThemeMode.DARK;
      },
    }))
    .actions((self) => ({
      setLightMode() {
        self.mode = ThemeMode.LIGHT;
      },
      setDarkMode() {
        self.mode = ThemeMode.DARK;
      },
      swtichMode() {
        if (self.mode === ThemeMode.DARK) {
          self.mode = ThemeMode.LIGHT;
        } else {
          self.mode = ThemeMode.DARK;
        }
      },
    })),
  {},
);

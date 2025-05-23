export const cleanUpObject = (obj: { [key: string]: string }) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return value
      ? {
          ...acc,
          [key]: value,
        }
      : acc;
  }, {});
};

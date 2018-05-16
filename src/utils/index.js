export { default as colors } from './colors';

export const json_to_array = (json) => (
  Object.keys(json).reduce((acc, curr) => {
    acc.push(json[curr]);
    return acc;
  }, [])
);

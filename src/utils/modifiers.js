const json_to_array = (json) => (
  Object.keys(json).reduce((acc, curr) => {
    acc.push(json[curr]);
    return acc;
  }, [])
);

const use_plural = (string, size) => (
  size !== 1 && size >= 0
    ? `${string}s`
    : string
)

export default {
  json_to_array,
  use_plural,
}

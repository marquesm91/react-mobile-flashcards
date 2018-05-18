import { colors } from './index';

const json_to_array = (json) => (
  Object.keys(json).reduce((acc, curr) => {
    acc.push(json[curr]);
    return acc;
  }, [])
);

const use_plural = (target, size) => (
  size !== 1 && size >= 0
    ? `${target}s`
    : target
)

const get_color_by_result = (target, index) => (
  target[index]
    ? colors.green
    : colors.red
)

const get_label_by_result = (target, index) => (
  target[index]
    ? 'Correct'
    : 'Incorrect'
)

export default {
  json_to_array,
  use_plural,
  get_color_by_result,
  get_label_by_result,
}

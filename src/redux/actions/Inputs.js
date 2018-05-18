export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const RESET_INPUTS = 'RESET_INPUTS';
export const SET_SPOILER = 'SET_SPOILER';
export const SET_DIRTY = 'SET_DIRTY';

export const setInputValue = (key, result) => ({
  type: SET_INPUT_VALUE,
  key,
  result,
});

export const setDirty = dirty => ({
  type: SET_DIRTY,
  dirty,
});

export const resetInputs = () => ({
  type: RESET_INPUTS,
});

export const setSpoiler = (spoiler) => ({
  type: SET_SPOILER,
  spoiler,
});

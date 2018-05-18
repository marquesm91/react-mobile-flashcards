export const SET_RESULT = 'SET_RESULT';
export const RESET_RESULTS = 'RESET_RESULTS';

export const setResult = (key, result) => ({
  type: SET_RESULT,
  key,
  result,
});

export const resetResults = () => ({
  type: RESET_RESULTS,
});

import {
  SET_RESULT,
  RESET_RESULTS,
} from '../actions';

const initialState = {};

const Results = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESULT:
      return { ...state, [action.key]: action.result };
    case RESET_RESULTS:
      return initialState;
    default:
      return state;
  }
};

export default Results;
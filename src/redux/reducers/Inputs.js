import {
  SET_DIRTY,
  SET_INPUT_VALUE,
  RESET_INPUTS,
  SET_SPOILER
} from '../actions';

const initialState = {
  dirty: false,
  spoiler: -1,
};

const Inputs = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRTY:
      return { ...state, dirty: action.dirty };
    case SET_INPUT_VALUE:
      return { ...state, [action.key]: action.result };
    case SET_SPOILER:
      return { ...state, spoiler: action.spoiler };
    case RESET_INPUTS:
      return initialState;
    default:
      return state;
  }
};

export default Inputs;
import {
  SET_DECKS,
  SELECT_DECK,
} from '../actions';

const initialState = {
  list: [],
  selected: null,
};

const Decks = (state = initialState, action) => {
  switch (action.type) {
    case SET_DECKS:
      return { ...state, list: action.decks };
    case SELECT_DECK:
      return { ...state, selected: action.title };
    default:
      return state;
  }
};

export default Decks;
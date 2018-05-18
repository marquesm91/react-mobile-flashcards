import {
  SET_DECKS,
  SELECT_DECK,
  SET_DECKS_LOADED,
} from '../actions';

const initialState = {
  list: [],
  selected: null,
  loaded: false,
};

const Decks = (state = initialState, action) => {
  switch (action.type) {
    case SET_DECKS:
      return { ...state, list: action.decks };
    case SELECT_DECK:
      return { ...state, selected: action.title };
    case SET_DECKS_LOADED:
      return { ...state, loaded: true };
    default:
      return state;
  }
};

export default Decks;
import storage from '../../storage';

export const SET_DECKS = 'SET_DECKS';
export const SELECT_DECK = 'SELECT_DECK';
export const SET_DECKS_LOADED = 'SET_DECKS_LOADED';

const _setDecks = decks => ({
  type: SET_DECKS,
  decks,
});

const setDecksLoaded = () => ({
  type: SET_DECKS_LOADED,
});

export const selectDeck = title => ({
  type: SELECT_DECK,
  title,
});

export const getDecks = () => async (dispatch) => {
  const decks = await storage.getDecks();
  dispatch(setDecksLoaded());
  dispatch(_setDecks(decks));
};

export const createDeck = title => async (dispatch) => {
  const decks = await storage.createDeck(title);
  dispatch(_setDecks(decks));
};

export const deleteDeck = title => async (dispatch) => {
  const decks = await storage.deleteDeck(title);
  dispatch(_setDecks(decks));
};

export const deleteAll = () => async (dispatch) => {
  const decks = await storage.deleteAll();
  dispatch(_setDecks(decks));
};

export const addCardToDeck = (title, card) => async (dispatch) => {
  const decks = await storage.addCardToDeck(title, card);
  dispatch(_setDecks(decks));
};

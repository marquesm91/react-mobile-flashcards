import { combineReducers } from 'redux';
import decks from './Decks';
import results from './Results';
import inputs from './Inputs';

export default combineReducers({
  decks,
  results,
  inputs,
});
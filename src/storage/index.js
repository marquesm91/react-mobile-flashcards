import { AsyncStorage } from 'react-native';
import dayjs from 'dayjs';

const STORAGE = 'deck-storage';

const getStorage = async () => {
  const storage = await AsyncStorage.getItem(STORAGE);
  if (storage) {
    return JSON.parse(storage);
  }

  return {};
};

export const createDeck = async (title) => {
  const storage = await getStorage();
  storage[title] = {};
  storage[title].title = title;
  storage[title].createdAt = dayjs().toISOString();
  storage[title].questions = [];
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
};

export const deleteDeck = async (deck) => {
  const storage = await getStorage();
  delete storage[deck.title];
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
};

export const deleteAll = async () => {
  const storage = {};
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
};

export const addCardToDeck = async (target, card) => {
  const storage = await getStorage();
  storage[target].questions.push(card);
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
};

export const addHistoryToDeck = async (target, history) => {
  const storage = await getStorage();
  const key = dayjs().diff(createdAt, 'days');

  if (!storage[target].history[key]) {
    storage[target].history[key] = [];
  }

  storage[target].history[key].push(history);
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
};

export const getDeck = async (title, key = null) => {
  const storage = await getStorage();
  if (key) {
    return storage[title][key];
  }

  return storage[title];
};

export const getDecks = async (title, key = null) => {
  const storage = await getStorage();
  
  return Object.keys(storage).reduce((acc, curr) => {
    acc.push(storage[curr]);
    return acc;
  }, []);
};

/* Interface Storage Object
{
  title: 'JavaScript',
  createdAt: '2018-05-15T01:19:44.013Z',
  questions: [
    {
      question: 'What const is for?',
      answer: 'To define a constant',
    },
    {
      question: 'JavaScript has classes?',
      answer: 'No',
    },
  ],
  history: {
    "0": [
      { points: 2, results: [true, true] },
      { points: 2, results: [true, true] },
    ],
    "1": [
      { points: 1, results: [true, false] },
      { points: 0, results: [false, false] },
    ],
  },
}
*/

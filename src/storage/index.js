import { AsyncStorage } from 'react-native';
import dayjs from 'dayjs';

const STORAGE = 'deck-storage';

const json_to_array = (json) => (
  Object.keys(json).reduce((acc, curr) => {
    acc.push(json[curr]);
    return acc;
  }, [])
);

const getStorage = async () => {
  const storage = await AsyncStorage.getItem(STORAGE);
  if (storage) {
    return JSON.parse(storage);
  }

  return {};
};

const createDeck = async (title) => {
  const storage = await getStorage();
  storage[title] = {};
  storage[title].title = title;
  storage[title].createdAt = dayjs().toISOString();
  storage[title].questions = [];
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
  return json_to_array(storage);
};

const deleteDeck = async (title) => {
  const storage = await getStorage();
  delete storage[title];
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
  return json_to_array(storage);
};

const deleteAll = async () => {
  const emptyStorage = {};
  await AsyncStorage.setItem(STORAGE, JSON.stringify(emptyStorage));
  return [];
};

const addCardToDeck = async (target, card) => {
  const storage = await getStorage();
  storage[target].questions.push(card);
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
  return json_to_array(storage);
};

const addHistoryToDeck = async (target, history) => {
  const storage = await getStorage();
  const key = dayjs().diff(createdAt, 'days');

  if (!storage[target].history[key]) {
    storage[target].history[key] = [];
  }

  storage[target].history[key].push(history);
  await AsyncStorage.setItem(STORAGE, JSON.stringify(storage));
  return json_to_array(storage);
};

const getDeck = async (title, key = null) => {
  const storage = await getStorage();
  if (key) {
    return storage[title][key];
  }

  return storage[title];
};

const getDecks = async (title, key = null) => {
  const storage = await getStorage();
  return json_to_array(storage);
};

export default {
  getDecks,
  getDeck,
  addHistoryToDeck,
  addCardToDeck,
  deleteAll,
  deleteDeck,
  createDeck,
}

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

import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './src/utils';
import { Home, DeckAdd, DeckDetail, DeckEditMode, DeckGame } from './src/screens';

export const createRootNavigator = () => StackNavigator({
  Home: { screen: Home },
  DeckAdd: { screen: DeckAdd },
  DeckDetail: { screen: DeckDetail },
  DeckEditMode: { screen: DeckEditMode },
  DeckGame: { screen: DeckGame },
}, {
  navigationOptions: {
    tabBarLabel: 'Decks',
    tabBarIcon: ({ tintColor }) => (
      <MaterialCommunityIcons name="cards" color={tintColor} size={24} />
    ),
    headerStyle: {
      paddingRight: 10,
      paddingLeft: 10,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 2,
      shadowOpacity: 0.15,
    },
  },
});

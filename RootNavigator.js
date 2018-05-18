import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
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

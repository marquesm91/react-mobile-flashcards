import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './src/utils';
import { Home, DeckAdd, DeckDetail, DeckEditMode, DeckGame } from './src/screens';

export const createRootNavigator = () => TabNavigator(
  {
    Home: StackNavigator({
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
        },
      },
    }),
  }, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      indicatorStyle: { backgroundColor: colors.primary },
      activeTintColor: colors.primary,
      inactiveTintColor: colors.primaryInactive,
      style: {
        backgroundColor: colors.white,
      },
    },
  },
);

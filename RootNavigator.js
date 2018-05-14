import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from './utils';
import { Home, DeckDetail } from './screens';

export const createRootNavigator = () => TabNavigator(
  {
    Home: StackNavigator({
      Home: { screen: Home },
      DeckDetail: { screen: DeckDetail },
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

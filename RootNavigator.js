import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from './styles';
import { Home, Profile, Wod } from './screens';

const createNavigator = () => TabNavigator({
  Home: StackNavigator( {
    Home: { screen: Home },
    Wod: { screen: Wod },
  },
  {
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" color={tintColor} size={24} />
      ),
      headerStyle: {
        paddingRight: 10,
        paddingLeft: 10,
      },
    },
  }),
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user" color={tintColor} size={24} />
      ),
    },
  },
},
{
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    indicatorStyle: { backgroundColor: colors.primary },
    activeTintColor: colors.primary,
    inactiveTintColor: colors.light,
    style: {
      backgroundColor: colors.white,
    },
  },
});

export default createNavigator;

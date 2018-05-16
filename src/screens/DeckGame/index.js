import React, { Component } from 'react';
import { Deck } from '../../components';
import { Button, Container, HeaderText, HeaderButton, Text } from './styles';
import { colors } from '../../utils';
import notifications from '../../notifications';

class DeckGame extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Game
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });

  setTomorrowNotification = () => (
    notifications.clearLocalNotification()
      .then(notifications.setLocalNotification)
  )

  render() {
    return (
      <Container>
        <Text>Deck</Text>
        <Text>Game</Text>
      </Container>
    );
  }
}

export default DeckGame;

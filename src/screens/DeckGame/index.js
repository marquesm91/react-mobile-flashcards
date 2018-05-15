import React, { Component } from 'react';
import { Deck } from '../../components';
import { Button, CenteredView, HeaderText, HeaderButton, Text } from './styles';
import { colors } from '../../utils';

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

  render() {
    return (
      <CenteredView>
        <Text>Deck</Text>
        <Text>Game</Text>
      </CenteredView>
    );
  }
}

export default DeckGame;

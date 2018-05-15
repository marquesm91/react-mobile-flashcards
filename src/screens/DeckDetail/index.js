import React, { Component } from 'react';
import { Deck } from '../../components';
import { Button, CenteredView, HeaderText, HeaderButton, Text } from './styles';
import { colors } from '../../utils';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Detail
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });

  render() {
    const { name, numberOfCards } = this.props.navigation.state.params;
    return (
      <CenteredView>
        <Text>{name}</Text>
        <Text>{numberOfCards}</Text>
        <Button onPress={() => this.props.navigation.navigate('DeckGame')}>
          <Text>Start Quiz</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('DeckEditMode')}>
          <Text>Create New Question</Text>
        </Button>
      </CenteredView>
    );
  }
}

export default DeckDetail;

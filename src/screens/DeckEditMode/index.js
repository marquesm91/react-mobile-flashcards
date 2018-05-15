import React, { Component } from 'react';
import { Deck } from '../../components';
import { Button, CenteredView, HeaderText, HeaderButton, Text, Input } from './styles';
import { colors } from '../../utils';

class DeckEditMode extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Edit Mode
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });

  state = {
    question: '',
    answer: '',
  }

  render() {
    const { question, answer } = this.state;

    return (
      <CenteredView>
        <Input
          onChangeText={question => this.setState({ question })}
          value={question}
        />
        <Input
          onChangeText={answer => this.setState({ answer })}
          value={answer}
        />
        <Button>
          <Text>Create New Question</Text>
        </Button>
      </CenteredView>
    );
  }
}

export default DeckEditMode;

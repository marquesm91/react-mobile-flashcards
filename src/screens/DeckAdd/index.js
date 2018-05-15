import React, { Component } from 'react';
import { Deck } from '../../components';
import { createDeck, deleteAll } from '../../storage';
import { Button, CenteredView, HeaderText, HeaderButton, Text, Input } from './styles';
import { colors } from '../../utils';

class DeckAdd extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Add
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });

  state = {
    title: '',
  }

  createDeckHandler = async () => {
    const { title } = this.state;

    if (title) {
      await createDeck(title);
    }
  }

  render() {
    const { title } = this.state;

    return (
      <CenteredView>
        
        <Input
          onChangeText={title => this.setState({ title })}
          value={title}
        />
        <Button onPress={this.createDeckHandler}>
          <Text>Create Deck</Text>
        </Button>
      </CenteredView>
    );
  }
}

export default DeckAdd;

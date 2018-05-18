import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Deck, DismissKeyboardView } from '../components';
import { colors } from '../utils';
import { createDeck, selectDeck } from '../redux/actions';
import {
  Button,
  Wrapper,
  HeaderButton,
  Text,
  Input
} from './styles';

class DeckAdd extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Add Deck
      </Text>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text size={18} bold>Back</Text>
      </HeaderButton>
    ),
  });

  state = {
    title: '',
  }

  createDeckHandler = async () => {
    const { title } = this.state;

    if (title) {
      await this.props.createDeck(title);
      this.props.selectDeck(title);
      this.props.navigation.navigate('DeckDetail');
    }
  }

  render() {
    const { title } = this.state;

    return (
      <DismissKeyboardView centered>
        <Input
          placeholder="How about React?"
          onChangeText={title => this.setState({ title })}
          value={title}
          size={16}
        />
        <Button primary onPress={this.createDeckHandler}>
          <Text primary bold center size={16}>Create New Deck</Text>
        </Button>
      </DismissKeyboardView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createDeck: title => dispatch(createDeck(title)),
  selectDeck: title => dispatch(selectDeck(title)),
});

export default connect(null, mapDispatchToProps)(DeckAdd);

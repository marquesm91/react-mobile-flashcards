import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DismissKeyboardView, Input } from '../components';
import { colors, constants } from '../utils';
import { createDeck, selectDeck, resetInputs } from '../redux/actions';
import { Button, HeaderButton, Text } from '../styles';

class DeckAdd extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Create Deck
      </Text>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text size={18} bold>Back</Text>
      </HeaderButton>
    ),
  });

  createDeckHandler = async () => {
    const { title, createDeck, selectDeck, resetInputs, navigation } = this.props;

    if (title) {
      await createDeck(title);
      selectDeck(title);
      resetInputs();
      navigation.navigate(constants.DECK_DETAIL);
    }
  }

  render() {
    return (
      <DismissKeyboardView centered>
        <Input name={constants.TITLE} placeholder="Maybe your favorite subject?" />
        <Button primary onPress={this.createDeckHandler}>
          <Text primary bold center size={16}>Create New Deck</Text>
        </Button>
      </DismissKeyboardView>
    );
  }
}

const mapStateToProps = ({ inputs }) => ({
  title: inputs[constants.TITLE] ? inputs[constants.TITLE] : '',
})

const mapDispatchToProps = dispatch => ({
  createDeck: title => dispatch(createDeck(title)),
  selectDeck: title => dispatch(selectDeck(title)),
  resetInputs: () => dispatch(resetInputs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckAdd);

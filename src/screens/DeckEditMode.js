import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { DismissKeyboardView, Input } from '../components';
import { colors, modifiers, constants } from '../utils';
import { addCardToDeck, resetInputs } from '../redux/actions';
import { Button, HeaderButton, Text, Wrapper } from '../styles';

class DeckEditMode extends Component {
  static navigationOptions = ({ navigation }) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: constants.DECK_DETAIL })
      ]
    });

    return {
      title: (
        <Text color={colors.purple} size={20} bold>
          Add Card
        </Text>
      ),
      headerLeft: (
        <HeaderButton left onPress={() => navigation.dispatch(resetAction)}>
          <Text size={18} bold>Back</Text>
        </HeaderButton>
      ),
    }
  };

  state = {
    cardsAdd: 0,
    taps: 0,
  }

  addCardToDeckHandler = (options) => {
    const { deck, addCardToDeck, resetInputs, navigation, dirty, question, answer } = this.props;
    const { cardsAdd } = this.state;

    /* Dirty input fields and at least add one card to count taps */
    if (!dirty && cardsAdd) {
      this.setState(({ taps }) => ({ taps: taps + 1 }));
    }

    /* Add cards to deck only if not empty and dirty fields */
    if (question && answer && dirty) {
      addCardToDeck(deck.title, { question, answer });
      resetInputs();

      if (options.redirect) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: constants.DECK_DETAIL })
          ]
        });

        navigation.dispatch(resetAction);
      } else {
        this.setState(({ cardsAdd, taps }) => ({
          cardsAdd: cardsAdd + 1,
          taps: 0,
        }));
      }
    }
  }

  renderFooter = () => {
    const { title } = this.props.deck;
    const { taps, cardsAdd } = this.state;

    /* Show user it is useless to tap multiple times on button to add something won't */
    if (taps >= 2) {
      return <Text>Hey! You <Text size={12} bold>already add</Text> that card!</Text>;
    }

    /* Render a nice counter footer when add at least 1 card */
    if (cardsAdd) {
      return <Text size={12}>You add <Text size={14} bold color={colors.purple}>{cardsAdd}</Text> {modifiers.use_plural('card', cardsAdd)} to {title}</Text>;
    }

    return null;
  }

  render() {
    const { cardsAdd } = this.state;

    return (
      <DismissKeyboardView>
        <Wrapper justify="center" align="center">
          <Input name={constants.QUESTION} placeholder="Pick a question" />
          <Input name={constants.ANSWER} placeholder="Pick a answer" />
        </Wrapper>
        <Wrapper flex={2} justify="flex-start" align="center">
          <Button primary onPress={() => this.addCardToDeckHandler({ redirect: true })}>
            <Text primary bold center size={16}>Create Card</Text>
          </Button>
          <Button primary onPress={() => this.addCardToDeckHandler({ redirect: false })}>
            <Text primary bold center size={16}>Create and Add More</Text>
          </Button>
          {this.renderFooter()}
        </Wrapper>
      </DismissKeyboardView>
    );
  }
}

const mapStateToProps = ({ decks, inputs }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
  dirty: inputs.dirty,
  question: inputs[constants.QUESTION] ? inputs[constants.QUESTION] : '',
  answer: inputs[constants.ANSWER] ? inputs[constants.ANSWER] : '',
});

const mapDispatchToProps = dispatch => ({
  addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card)),
  resetInputs: () => dispatch(resetInputs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditMode);

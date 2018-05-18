import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Deck, DismissKeyboardView } from '../components';
import { colors, modifiers } from '../utils';
import { addCardToDeck } from '../redux/actions';
import {
  Button,
  Container,
  HeaderButton,
  Text,
  Input,
  Wrapper,
} from './styles';

class DeckEditMode extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Add Card
      </Text>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text size={18} bold>Back</Text>
      </HeaderButton>
    ),
  });

  state = {
    question: '',
    answer: '',
    dirty: false,
    cardsAdd: 0,
    taps: 0,
  }

  addCardToDeckHandler = (options) => {
    const { title } = this.props.deck;
    const { question, answer, dirty, cardsAdd } = this.state;

    /* Dirty input fields and at least add one card to count taps */
    if (!dirty && cardsAdd) {
      this.setState(({ taps }) => ({ taps: taps + 1 }));
    }

    /* Add cards to deck only if not empty and dirty fields */
    if (question && answer && dirty) {
      this.props.addCardToDeck(title, { question, answer });

      if (options.redirect) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'DeckDetail' })
          ]
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        this.setState(({ cardsAdd, taps }) => ({
          dirty: false,
          cardsAdd: cardsAdd + 1,
          taps: 0,
        }));
      }
    }
  }

  changeInputHandler = (key, value) => this.setState({ [key]: value, dirty: true });

  renderFooter = () => {
    const { title } = this.props.deck;
    const { taps, cardsAdd } = this.state;

    /* Show user it is useless to tap multiple times on button to add something won't */
    if (taps >= 2) {
      return <Text>Hey! You <Text size={12} bold color={colors.purple}>already add</Text> that card!</Text>;
    }

    /* Render a nice counter footer when add at least 1 card */
    if (cardsAdd) {
      return <Text size={12}>You add <Text size={14} bold color={colors.purple}>{cardsAdd}</Text> {modifiers.use_plural('card', cardsAdd)} to {title}</Text>;
    }

    return null;
  }

  render() {
    const { question, answer, cardsAdd } = this.state;

    return (
      <DismissKeyboardView>
        <Wrapper justify="center" align="center">
          <Input
            placeholder="Pick a question"
            onChangeText={value => this.changeInputHandler('question', value)}
            value={question}
            size={16}
          />
          <Input
            placeholder="Pick a answer"
            onChangeText={value => this.changeInputHandler('answer', value)}
            value={answer}
            size={16}
          />
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

const mapStateToProps = ({ decks }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
});

const mapDispatchToProps = dispatch => ({
  addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditMode);

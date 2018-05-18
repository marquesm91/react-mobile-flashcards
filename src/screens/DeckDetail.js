import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { colors, modifiers, constants } from '../utils';
import { deleteDeck, resetResults, setSpoiler } from '../redux/actions';
import { Button, Container, HeaderButton, Text, Wrapper } from '../styles';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: constants.HOME })
      ]
    });

    return {
      title: (
        <Text color={colors.purple} size={20} bold>
          Detail Deck
        </Text>
      ),
      headerLeft: (
        <HeaderButton left onPress={() => navigation.dispatch(resetAction)}>
          <Text size={18} bold>Back</Text>
        </HeaderButton>
      ),
    }
  };

  componentDidMount() {
    const { hasResults, hasSpoiler, resetResults, resetSpoiler } = this.props;
    
    hasResults && resetResults();
    hasSpoiler && resetSpoiler();
  }

  deleteDeckHandler = () => {
    const { deck, deleteDeck, navigation } = this.props;

    deleteDeck(deck.title);
    navigation.goBack();
  }

  confirmDeleteHandler = () => {
    Alert.alert(
      `Delete ${this.props.deck.title} deck`,
      'Are you sure you want to delete this deck?',
      [
        { text: 'OK', onPress: () => this.deleteDeckHandler() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { deck } = this.props;

    if (!deck) {
      return null;
    }

    const numberOfCards = deck.questions.length;

    return (
      <Container>
        <Wrapper>
          <Text size={36} bold>{deck.title}</Text>
          <Text size={18}>This deck has {numberOfCards} {modifiers.use_plural('card', numberOfCards)}</Text>
        </Wrapper>
        <Wrapper justify="center" align="center">
          <Button primary onPress={() => this.props.navigation.navigate(constants.DECK_GAME)}>
            <Text primary center bold size={16}>Start Quiz</Text>
          </Button>
          <Button secondary onPress={() => this.props.navigation.navigate(constants.DECK_EDIT_MODE)}>
            <Text secondary center bold size={16}>Create New Question</Text>
          </Button>
        </Wrapper>
        <Wrapper justify="center" align="center">
          <Button danger onPress={this.confirmDeleteHandler}>
            <Text danger center bold size={14}>Delete Deck</Text>
          </Button>
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = ({ decks, results, inputs }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
  hasResults: Object.keys(results).length,
  hasSpoiler: (inputs.spoiler !== -1),
});

const mapDispatchToProps = dispatch => ({
  deleteDeck: title => dispatch(deleteDeck(title)),
  resetResults: () => dispatch(resetResults()),
  resetSpoiler: () => dispatch(setSpoiler(-1)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);

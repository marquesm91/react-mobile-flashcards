import React, { Component, Fragment } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import { Deck, Toggler, Results, Quiz } from '../components';
import { colors, modifiers, constants } from '../utils';
import notifications from '../notifications';
import { HeaderButton, Text } from '../styles';

class DeckGame extends Component {
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
          Quiz Game
        </Text>
      ),
      headerLeft: (
        <HeaderButton left onPress={() => navigation.dispatch(resetAction)}>
          <Text size={18} bold>Back</Text>
        </HeaderButton>
      ),
    }
  };

  render() {
    const { deck, results, hasResults, isGameOver } = this.props;

    if (hasResults && isGameOver) {
      const corrects = results.filter(r => r).length;
      const total = deck.questions.length;

      return <Results corrects={corrects} total={total} />
    }

    return <Quiz />;
  }
}

const mapStateToProps = ({ decks, results }) => {
  const deck = decks.list.find(l => l.title === decks.selected);
  const _results = modifiers.json_to_array(results);
  const hasResults = _results.length > 0;
  const isGameOver = _results.length === deck.questions.length;

  return {
    results: _results,
    deck,
    hasResults,
    isGameOver,
  };
};

export default connect(mapStateToProps)(DeckGame);

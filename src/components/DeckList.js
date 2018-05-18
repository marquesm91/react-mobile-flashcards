import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { Deck } from '../components';
import { colors, constants } from '../utils';
import { getDecks, selectDeck } from '../redux/actions';
import { ScrollViewContainer, Text, DeckListHeader } from '../styles';

class DeckList extends PureComponent {
  onDeckPressHandler = deck => {
    const { selectDeck, navigation } = this.props;

    selectDeck(deck.title);
    navigation.navigate(constants.DECK_DETAIL);
  }

  render() {
    const { decks } = this.props;

    return (
      <ScrollViewContainer>
        <DeckListHeader>
          <Text size={18} bold>Deck name</Text>
          <Text size={18} bold>Number of Cards</Text>
        </DeckListHeader>
        {decks.map((deck, index) => (
          <Deck primary key={index} onPress={() => this.onDeckPressHandler(deck)}>
            <Text primary size={18} bold>{deck.title}</Text>
            <Text primary size={18} bold>{deck.questions.length}</Text>
          </Deck>
        ))}
      </ScrollViewContainer>
    );
  }
}

const mapStateToProps = ({ decks }) => ({
  decks: decks.list,
});

const mapDispatchToProps = dispatch => ({
  selectDeck: (title) => dispatch(selectDeck(title)),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DeckList));

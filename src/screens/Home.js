import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderButton, Container, Text, HomeHeader, CenteredView } from './styles';
import { Deck } from '../components';
import { colors } from '../utils';
import { getDecks, selectDeck } from '../redux/actions';

class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Flash Decks
      </Text>
    ),
    headerRight: (
      <HeaderButton right onPress={() => navigation.navigate('DeckAdd')}>
        <MaterialCommunityIcons name="plus" size={32} color={colors.purple} />
      </HeaderButton>
    ),
  });

  state = {
    decksLoaded: false,
  }

  async componentDidMount() {
    await this.props.getDecks();
    this.setState({ decksLoaded: true });
  }

  onDeckPressHandler = deck => {
    this.props.selectDeck(deck.title);
    this.props.navigation.navigate('DeckDetail');
  }

  render() {
    if (!this.state.decksLoaded) return null;

    const { decks } = this.props;

    if (!decks.length) {
      return (
        <CenteredView horizontal>
          <Text size={16} bold>
            Add new deck!
          </Text>
        </CenteredView>
      );
    }

    return (
      <Container>
        <HomeHeader>
          <Text size={18} bold>Deck name</Text>
          <Text size={18} bold>Number of Cards</Text>
        </HomeHeader>
        {decks.map((deck, index) => (
          <Deck
            key={index}
            title={deck.title}
            numberOfCards={deck.questions.length}
            onPress={() => this.onDeckPressHandler(deck)}
          />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = ({ decks }) => ({
  decks: decks.list,
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(getDecks()),
  selectDeck: (title) => dispatch(selectDeck(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

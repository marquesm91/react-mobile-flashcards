import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Welcome, DeckList } from '../components';
import { colors, constants } from '../utils';
import { getDecks } from '../redux/actions';
import { HeaderButton, Text } from '../styles';

class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Flash Cards
      </Text>
    ),
    headerRight: (
      <HeaderButton right onPress={() => navigation.navigate(constants.DECK_ADD)}>
        <Text color={colors.black} size={18} bold>
          Create
        </Text>
      </HeaderButton>
    ),
  });

  async componentDidMount() {
    const { isDecksLoaded, getDecks } = this.props;

    if (!isDecksLoaded) {
      await getDecks();
    }
  }

  render() {
    const { isDecksLoaded, decks } = this.props;

    if (!isDecksLoaded) {
      return null;
    }

    return decks.length ? <DeckList /> : <Welcome />;
  }
}

const mapStateToProps = ({ decks }) => ({
  decks: decks.list,
  isDecksLoaded: decks.loaded
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(getDecks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

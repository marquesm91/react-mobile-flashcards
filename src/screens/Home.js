import React, { PureComponent } from 'react';
import { Animated, View } from 'react-native';
import { connect } from 'react-redux';
import { Deck, AnimatedView } from '../components';
import { colors } from '../utils';
import { getDecks, selectDeck } from '../redux/actions';
import {
  HeaderButton,
  Wrapper,
  ScrollViewContainer,
  Text,
  HomeHeader,
  CenteredView,
  Dot,
} from './styles';

class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Flash Cards
      </Text>
    ),
    headerRight: (
      <HeaderButton right onPress={() => navigation.navigate('DeckAdd')}>
        <Text color={colors.black} size={18} bold>
          Create
        </Text>
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

    let { fadeAnim } = this.state;
    const { decks } = this.props;

    if (!decks.length) {
      return (
        <CenteredView>
          <AnimatedView duration={1250}>
            <Text size={36} bold alignSelf="center">
              Welcome to
            </Text>
            <Text size={32} bold color={colors.purple} alignSelf="center">
              Flash Cards
            </Text>
            <Text size={18} alignSelf="center" style={{ marginTop: 15 }}>
              a modern way to learn
            </Text>
          </AnimatedView>
          <AnimatedView duration={1500}>
            <Text size={18} bold style={{ marginBottom: 35 }}>
              It is simple!
            </Text>
            <Text size={16}>
              <Dot color={colors.purple} rounded /> Create a new Deck
            </Text>
            <Text size={16}>
              <Dot color={colors.lightpurple} rounded /> Add Cards to your brand new Deck 
            </Text>
            <Text size={16}>
              <Dot color={colors.purple} rounded /> Most important, be creative!
            </Text>
            <Text size={16}>
              <Dot color={colors.lightpurple} rounded /> Start the quiz and test yourself
            </Text>
          </AnimatedView>
          <AnimatedView duration={1750}>
            <Text size={18} bold style={{ marginBottom: 35 }}>
              Made with <Text color={colors.red} size={25}>♥</Text>
            </Text>
          </AnimatedView>
        </CenteredView>
      );
    }

    return (
      <ScrollViewContainer>
        <HomeHeader>
          <Text size={18} bold>Deck name</Text>
          <Text size={18} bold>Number of Cards</Text>
        </HomeHeader>
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
  getDecks: () => dispatch(getDecks()),
  selectDeck: (title) => dispatch(selectDeck(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDecks } from '../../storage';
import styled from 'styled-components';
import { Deck } from '../../components';
import { colors } from '../../utils';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        FlashDecks
      </HeaderText>
    ),
    headerRight: (
      <HeaderButton right onPress={() => navigation.navigate('DeckAdd')}>
        <MaterialCommunityIcons name="plus" size={28} color={colors.primary} />
      </HeaderButton>
    ),
  });

  state = {
    decks: null,
  }

  async componentDidMount() {
    const decks = await getDecks();
    this.setState({ decks });
  }

  onDeckPressHandler = deck => this.props.navigation.navigate('DeckDetail',{
    name: deck.name,
    numberOfCards: deck.numberOfCards,
  });

  render() {
    const { decks } = this.state;
    return (
      <CenteredView>
        <Text>{JSON.stringify({ decks })}</Text>
        {decks && decks.map((deck, index) => (
          <Deck
            key={index}
            title={deck.title}
            numberOfCards={deck.questions.length}
            onPress={() => this.onDeckPressHandler(deck)}
          />
        ))}
      </CenteredView>
    );
  }
}

const CenteredView = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background-color: ${colors.backgroundPrimary};
`;

const Text = styled.Text`
  color: ${props => props.color || colors.default};
`;

const HeaderText = Text.extend`
  font-size: 16;
  font-weight: bold;
`;

const HeaderButton = styled.TouchableOpacity`
  padding-left: ${props => props.right ? 10 : 0};
  padding-right: ${props => props.left ? 10 : 0};
`;

export default Home;

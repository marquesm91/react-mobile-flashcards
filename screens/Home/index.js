import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { Deck } from '../../components';
import { colors } from '../../utils';

const decks = [
  {
    name: 'History Test #1',
    numberOfCards: 32,
  },
  {
    name: 'Math Test #3',
    numberOfCards: 12,
  },
];

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        FlashDecks
      </HeaderText>
    ),
    headerRight: (
      <HeaderButton right onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="plus" size={28} color={colors.primary} />
      </HeaderButton>
    ),
  });

  onDeckPressHandler = deck => this.props.navigation.navigate('DeckDetail',{
    name: deck.name,
    numberOfCards: deck.numberOfCards,
  });

  render() {
    return (
      <CenteredView>
        {decks.map((deck, index) => (
          <Deck
            key={index}
            name={deck.name}
            numberOfCards={deck.numberOfCards}
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

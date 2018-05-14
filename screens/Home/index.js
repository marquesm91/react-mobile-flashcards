import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
      <HeaderButton right onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="plus" size={28} color={colors.primary} />
      </HeaderButton>
    ),
  });

  onDeckPressHandler = () => this.props.navigation.navigate('DeckDetail');

  render() {
    return (
      <CenteredView>
        <Deck name="History Test #1" numberOfCards={32} onPress={this.onDeckPressHandler} />
        <Deck name="Math Test #2" numberOfCards={12} onPress={this.onDeckPressHandler} />
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

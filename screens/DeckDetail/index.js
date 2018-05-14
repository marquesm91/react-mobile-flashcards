import React, { Component } from 'react';
import styled from 'styled-components';
import { Deck } from '../../components';
import { colors } from '../../utils';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Detail
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });

  render() {
    return (
      <CenteredView>
        <Text>Deck detail!</Text>
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

export default DeckDetail;

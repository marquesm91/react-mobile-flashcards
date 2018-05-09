import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import { colors } from '../styles';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Flashcards
      </HeaderText>
    ),
    headerRight: (
      <HeaderButton right onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons name="plus" size={28} color={colors.primary} />
      </HeaderButton>
    ),
  });

  render() {
    return (
      <CenteredView>
        <Text>Hello!</Text>
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

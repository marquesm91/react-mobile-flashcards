import React, { Component } from 'react';
import styled from 'styled-components';
import { Text, TouchableOpacity } from 'react-native';

class Wod extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Wod',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </TouchableOpacity>
    ),
  });

  render() {
    return (
      <Wrapper>
        <HeaderText>Warm up 10&apos; AMRAP</HeaderText>
        <Text>10 burpees</Text>
        <Text>10 box jump</Text>
        <Text>10 push ups</Text>
        <HeaderText>Skill</HeaderText>
        <Text>3/3/3/3/3 Back Squat</Text>
        <HeaderText>WOD 20&apos; For Time</HeaderText>
        <Text>200m run</Text>
        <Text>10 Hang Snatch</Text>
        <Text>10 Push Press</Text>
      </Wrapper>
    );
  }
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  color: #555;
  font-weight: 700;
  font-size: 20;
  margin-top: 10;
  margin-bottom: 10;
`;

export { Wod };

import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Wod')}>
        <Text>Wod</Text>
      </TouchableOpacity>
    ),
  });

  render() {
    return (
      <Wrapper>
        <Text>Fulano</Text>
        <Text>Belo Horizonte-MG</Text>
        <Text>10 check-ins</Text>
        <Text>Box tal</Text>
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

export { Home };

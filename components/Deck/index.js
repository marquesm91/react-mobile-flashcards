import React from 'react';
import { Container, Text } from './styles';

const Deck = ({ name, numberOfCards, onPress }) => (
  <Container onPress={onPress}>
    <Text>{name}</Text>
    <Text>{numberOfCards}</Text>
  </Container>
);

export default Deck;
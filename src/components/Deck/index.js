import React from 'react';
import { Container, Text } from './styles';

const Deck = ({ title, numberOfCards, onPress }) => (
  <Container onPress={onPress}>
    <Text>{title}</Text>
    <Text>{numberOfCards}</Text>
  </Container>
);

export default Deck;
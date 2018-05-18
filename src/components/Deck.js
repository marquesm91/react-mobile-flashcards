import React from 'react';
import { ContainerCard, Text, Wrapper } from './styles';
import { colors } from '../utils';

const Deck = ({ title, numberOfCards, onPress }) => (
  <ContainerCard onPress={onPress}>
    <Text size={18} bold color={colors.white}>{title}</Text>
    <Text size={18} bold color={colors.white}>{numberOfCards}</Text>
  </ContainerCard>
);

export default Deck;
import React from 'react';
import { ContainerCard } from './styles';

const Deck = ({ children, onPress, ...props }) => (
  <ContainerCard onPress={onPress} {...props}>
    {children}
  </ContainerCard>
);

export default Deck;
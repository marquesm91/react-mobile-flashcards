import React from 'react';
import styled from 'styled-components';
import { Text } from 'react-native';

const Profile = () => (
  <Wrapper>
    <Text>Fulano</Text>
    <Text>Belo Horizonte-MG</Text>
    <Text>10 check-ins</Text>
    <Text>Box tal</Text>
  </Wrapper>
);

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export { Profile };

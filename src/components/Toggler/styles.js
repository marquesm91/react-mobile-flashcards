import styled from 'styled-components';
import { colors } from '../../utils';

export const Button = styled.TouchableOpacity`
  padding: 5px 10px;
  margin: 3px 0;
  border: 1px solid ${colors.default};
`;

export const Text = styled.Text`
  color: ${colors.default};
`;
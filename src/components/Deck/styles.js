import styled from 'styled-components';
import { colors } from '../../utils';

export const Container = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${colors.default};
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text`
  color: ${colors.default};
`;
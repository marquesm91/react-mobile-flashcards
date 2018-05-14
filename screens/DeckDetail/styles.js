import styled from 'styled-components';
import { colors } from '../../utils';

export const Button = styled.TouchableOpacity`
  padding: 5px 10px;
  margin: 3px 0;
  border: 1px solid ${colors.default};
`;

export const CenteredView = styled.ScrollView`
  padding: 10px;
  background-color: ${colors.backgroundPrimary};
`;

export const Text = styled.Text`
  background-color: red;
  color: ${props => props.color || colors.default};
`;

export const HeaderText = Text.extend`
  font-size: 16;
  font-weight: bold;
`;

export const HeaderButton = styled.TouchableOpacity`
  padding-left: ${props => props.right ? 10 : 0};
  padding-right: ${props => props.left ? 10 : 0};
`;
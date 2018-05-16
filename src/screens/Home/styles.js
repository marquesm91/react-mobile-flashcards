import styled from 'styled-components';
import { colors } from '../../utils';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background-color: ${colors.backgroundPrimary};
`;

export const Text = styled.Text`
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
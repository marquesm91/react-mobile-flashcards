import styled, { css } from 'styled-components';
import { colors } from '../utils';

export const Button = styled.TouchableOpacity`
  width: 220;
  padding: 15px 10px;
  margin: 8px 0;
  border: 1px solid ${colors.lightblack};
  border-radius: 3;
  ${props => props.danger && css`
    background-color: ${colors.red};
    border-color: ${colors.red};
    box-shadow: 0px 2.5px 2px rgba(0,0,0,0.5);
  `}
  ${props => props.primary && css`
    background-color: ${colors.purple};
    border-color: ${colors.purple};
    box-shadow: 0px 2.5px 2px rgba(0,0,0,0.8);
  `}
  ${props => props.secondary && css`
    background-color: ${colors.white};
    border-color: ${colors.lightwhite};
    box-shadow: 0px 2.5px 2px rgba(0,0,0,0.5);
  `}
  ${props => props.correct && css`
    background-color: ${colors.green};
    border-color: ${colors.green};
    box-shadow: 0px 2.5px 2px rgba(0,0,0,0.5);
  `}
  ${props => props.ghost && css`
    background-color: transparent;
    border-color: transparent;
  `}
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.grey,
  multiline: true,
})`
  width: 280;
  height: ${props => props.height};
  margin: 15px 0;
  font-size: ${props => props.size ? props.size : '12px'};
  border-style: solid;
  border-bottom-width: 1.5;
  border-bottom-color: ${colors.purple};
`;

export const Text = styled.Text`
  color: ${props => props.color || colors.lightblack};
  font-weight: ${props => props.bold ? 900 : 400};
  font-size: ${props => props.size ? props.size : '12px'};
  text-align: ${props => props.center ? 'center' : 'left'};
  align-self: ${props => props.alignSelf ? props.alignSelf : 'auto'};

  ${props => (props.primary || props.danger || props.correct) && css`
    color: ${colors.white};
  `}
  ${props => (props.secondary || props.ghost) && css`
    color: ${colors.purple};
  `}
`;

export const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView.attrs({
  behavior: 'padding',
})`
  flex: 1;
  padding: 10px;
  background-color: ${colors.white};

  ${props => props.centered && css `
    justify-content: center;
    align-items: center;
  `}
`;

export const ContainerCard = styled.TouchableOpacity`
  padding: 15px 10px;
  margin: 10px 0;
  border-radius: 3px;
  flex-direction: row;
  justify-content: space-between;

  ${props => props.primary && css `
    background-color: ${colors.purple};
    border: 1px solid ${colors.purple};
    box-shadow: 0px 2.5px 2px rgba(0,0,0,0.8);
  `}
  ${props => props.secondary && css `
    background-color: ${colors.white};
    border-color: ${colors.lightwhite};
    box-shadow: 0px 3px 0.4px rgba(187, 187, 187, 0.7);
  `}
`;

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${colors.white};

  ${props => props.centered && css `
    justify-content: center;
    align-items: center;
  `}
`;

export const Dot = styled.View`
  width: 10;
  height: 10;
  background-color: ${props => props.color};
  border-radius: ${props => props.rounded ? 50 : 0};
`;

export const CenteredView = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
`;

export const DeckListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`;

export const ScrollViewContainer = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background-color: ${colors.white};
`;

export const SwipperButton = styled.Text`
  font-size: 50;
  color: ${colors.purple};
  font-family: 'Arial';
`;

export const HeaderButton = styled.TouchableOpacity`
  padding-left: ${props => props.right ? 10 : 0};
  padding-right: ${props => props.left ? 10 : 0};
`;

export const Wrapper = styled.View`
  flex: ${props => props.flex ? props.flex : 1};
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
  align-items: ${props => props.align ? props.align : 'flex-start'};
  flex-direction: ${props => props.horizontal ? 'row' : 'column'};
`;

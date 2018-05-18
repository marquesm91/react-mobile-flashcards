import styled, { css } from 'styled-components';
import { colors } from '../utils';

export const Button = styled.TouchableOpacity`
  width: 220;
  padding: 5px 10px;
  margin: 8px 0;
  border: 1px solid ${colors.lightblack};
  border-radius: 3;
  ${props => props.danger && css`
    background-color: ${colors.white};
    border-color: ${colors.lightwhite};
    box-shadow: 0px 3px 0.4px rgba(187, 187, 187, 0.7);
  `}
  ${props => props.primary && css`
    background-color: ${colors.purple};
    border-color: ${colors.purple};
    box-shadow: 0px 3px 1px rgba(0,0,0,0.5);
  `}
  ${props => props.secondary && css`
    background-color: ${colors.white};
    border-color: ${colors.lightwhite};
    box-shadow: 0px 3px 0.4px rgba(187, 187, 187, 0.7);
  `}
  ${props => props.ghost && css`
    background-color: transparent;
    border-color: transparent;
  `}
`;

export const Text = styled.Text`
  color: ${props => props.color || colors.lightblack};
  font-weight: ${props => props.bold ? 900 : 400};
  font-size: ${props => props.size ? props.size : '12px'};
  text-align: ${props => props.center ? 'center' : 'left'};

  ${props => props.danger && css`
    color: ${colors.red};
  `}
  ${props => props.primary && css`
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
  border: 1px solid ${colors.purple};
  border-radius: 3px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.purple};
  box-shadow: 0px 4.5px 1.2px rgba(0,0,0,0.5);
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

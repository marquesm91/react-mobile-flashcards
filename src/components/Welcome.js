import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { AnimatedView } from '../components';
import { colors, constants } from '../utils';
import { Button, Text, CenteredView, Dot } from '../styles';

const { screens } = constants;

const Welcome = ({ navigation }) => (
  <CenteredView>
    <AnimatedView duration={1250}>
      <Text size={36} bold alignSelf="center">
        Welcome to
      </Text>
      <Text size={32} bold color={colors.purple} alignSelf="center">
        Flash Cards
      </Text>
      <Text size={18} alignSelf="center">
        a modern way to learn
      </Text>
    </AnimatedView>
    <AnimatedView duration={1500}>
      <Text size={14} bold style={{ marginBottom: 15 }}>
        It is simple!
      </Text>
      <Text size={12}>
        <Dot color={colors.purple} rounded /> Create a new Deck
      </Text>
      <Text size={12}>
        <Dot color={colors.lightpurple} rounded /> Add Cards to your brand new Deck 
      </Text>
      <Text size={12}>
        <Dot color={colors.purple} rounded /> Most important, be creative!
      </Text>
      <Text size={12}>
        <Dot color={colors.lightpurple} rounded /> Start the quiz and test yourself
      </Text>
    </AnimatedView>
    <AnimatedView duration={1750}>
      <Button primary onPress={() => navigation.navigate(screens.DECK_ADD)}>
        <Text primary center bold size={16}>Create a Deck</Text>
      </Button>
    </AnimatedView>
    <AnimatedView duration={2000}>
      <Text size={18} bold style={{ marginBottom: 35 }}>
        Made with <Text color={colors.red} size={25}>♥</Text>
      </Text>
    </AnimatedView>
  </CenteredView>
);

export default withNavigation(Welcome);

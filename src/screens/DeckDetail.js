import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button, Container, HeaderButton, Text, Wrapper } from './styles';
import { Deck } from '../components';
import { colors, modifiers } from '../utils';
import { deleteDeck } from '../redux/actions';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    });

    return {
      title: (
        <Text color={colors.purple} size={20} bold>
          Detail Deck
        </Text>
      ),
      headerLeft: (
        <HeaderButton left onPress={() => navigation.dispatch(resetAction)}>
          <Text size={18} bold>Back</Text>
        </HeaderButton>
      ),
    }
  };

  deleteDeckHandler = () => {
    const { title } = this.props.deck;
    this.props.deleteDeck(title);
    this.props.navigation.goBack();
  }

  confirmDeleteHandler = () => {
    Alert.alert(
      `Delete ${this.props.deck.title} deck`,
      'Are you sure you want to delete this deck?',
      [
        { text: 'OK', onPress: () => this.deleteDeckHandler() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { deck } = this.props;

    if (!deck) return null;

    const numberOfCards = deck.questions.length;

    return (
      <Container>
        <Wrapper>
          <Text size={36} bold>{deck.title}</Text>
          <Text size={18}>This deck has {numberOfCards} {modifiers.use_plural('card', numberOfCards)}</Text>
        </Wrapper>
        <Wrapper justify="center" align="center">
          <Button primary onPress={() => this.props.navigation.navigate('DeckGame')}>
            <Text primary center bold size={16}>Start Quiz</Text>
          </Button>
          <Button secondary onPress={() => this.props.navigation.navigate('DeckEditMode')}>
            <Text secondary center bold size={16}>Create New Card</Text>
          </Button>
        </Wrapper>
        <Wrapper justify="center" align="center">
          <Button danger onPress={this.confirmDeleteHandler}>
            <Text danger center bold size={14}>Delete Deck</Text>
          </Button>
        </Wrapper>
      </Container>
    );
  }
}

const mapStateToProps = ({ decks }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
});

const mapDispatchToProps = dispatch => ({
  deleteDeck: title => dispatch(deleteDeck(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);

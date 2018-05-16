import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Deck } from '../../components';
import { Button, Container, HeaderText, HeaderButton, Text } from './styles';
import { colors } from '../../utils';
import { deleteDeck } from '../../redux/actions';

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
        <HeaderText color={colors.primary}>
          Deck Detail
        </HeaderText>
      ),
      headerLeft: (
        <HeaderButton left onPress={() => navigation.dispatch(resetAction)}>
          <Text>Back</Text>
        </HeaderButton>
      ),
    }
  };

  deleteDeckHandler = () => {
    const { title } = this.props.deck;
    this.props.deleteDeck(title);
    this.props.navigation.goBack();
  }

  render() {
    const { deck } = this.props;

    if (!deck) return null;

    return (
      <Container>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length}</Text>
        <Button onPress={() => this.props.navigation.navigate('DeckGame')}>
          <Text>Start Quiz</Text>
        </Button>
        <Button onPress={() => this.props.navigation.navigate('DeckEditMode')}>
          <Text>Create New Question</Text>
        </Button>
        <Button onPress={this.deleteDeckHandler}>
          <Text>Delete Deck</Text>
        </Button>
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

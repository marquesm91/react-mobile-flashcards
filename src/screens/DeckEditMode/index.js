import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Deck } from '../../components';
import { Button, Container, HeaderText, HeaderButton, Text, Input } from './styles';
import { colors } from '../../utils';
import { addCardToDeck } from '../../redux/actions';

class DeckEditMode extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Edit Mode
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });

  state = {
    question: '',
    answer: '',
  }

  addCardToDeckHandler = () => {
    const { title } = this.props.deck;
    const { question, answer } = this.state;

    if (question && answer) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'DeckDetail' })
        ]
      });
      
      this.props.addCardToDeck(title, { question, answer });
      this.props.navigation.dispatch(resetAction);
<<<<<<< HEAD
=======
      //this.props.navigation.goBack();
>>>>>>> ba563b3b8831d8ca90259cf50ffef8c49a6f35ca
    }
  }

  render() {
    const { title } = this.props.deck;
    const { question, answer } = this.state;

    return (
      <Container>
        <Input
          onChangeText={question => this.setState({ question })}
          value={question}
        />
        <Input
          onChangeText={answer => this.setState({ answer })}
          value={answer}
        />
        <Button onPress={this.addCardToDeckHandler}>
          <Text>Create New Question to {title}</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({ decks }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
});

const mapDispatchToProps = dispatch => ({
  addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditMode);

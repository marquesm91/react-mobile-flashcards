import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button, Container, HeaderButton, Text, Input, Wrapper } from './styles';
import { Deck } from '../components';
import { colors } from '../utils';
import { addCardToDeck } from '../redux/actions';

class DeckEditMode extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Add Card
      </Text>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text size={18} bold>Back</Text>
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
    }
  }

  render() {
    const { title } = this.props.deck;
    const { question, answer } = this.state;

    return (
      <Container>
        <Wrapper justify="flex-start" align="flex-start">
          <Text size={18}>New question and answer to</Text>
          <Text size={36} bold>{title}</Text>
        </Wrapper>
        <Wrapper justify="center" align="center">
          <Input
            placeholder="Pick a question"
            onChangeText={question => this.setState({ question })}
            value={question}
            size={16}
          />
          <Input
            placeholder="Pick a answer"
            onChangeText={answer => this.setState({ answer })}
            value={answer}
            size={16}
          />
        </Wrapper>
        <Wrapper justify="center" align="center">
          <Button primary onPress={this.addCardToDeckHandler}>
            <Text primary bold center size={16}>Create New Question</Text>
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
  addCardToDeck: (title, card) => dispatch(addCardToDeck(title, card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckEditMode);

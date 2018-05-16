import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import { Deck, Toggler } from '../../components';
import { Button, Container, HeaderText, HeaderButton, Text } from './styles';
import { colors, json_to_array } from '../../utils';
import notifications from '../../notifications';

class DeckGame extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Game
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });
  
  state = {
    results: {},
  }

  setTomorrowNotification = () => (
    notifications.clearLocalNotification()
      .then(notifications.setLocalNotification)
  )

  checkProgressHandler = (key, value) => {
    this.setState(({ results }) => ({
      results: {
        ...results,
        [key]: value,
      },
    }));
  }

  resetGame = () => this.setState({ results: {} });

  render() {
    const { results } = this.state;
    const { deck } = this.props;

    const arr = json_to_array(this.state.results);

    if (!deck.questions.length) {
      return (
        <Container centered>
          <Text>
            This quiz doesn't have questions yet!
          </Text>
          <Button onPress={() => this.props.navigation.navigate('DeckEditMode')}>
            <Text>Create a new Question</Text>
          </Button>
        </Container>
      );
    }

    if (arr.length === deck.questions.length) {
      return (
        <Container centered>
          <Text>
            You answer {arr.filter(a => a).length} questions correctly on this quiz!
          </Text>
          <Button onPress={this.resetGame}>
            <Text>Restart Quiz</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate('DeckDetail')}>
            <Text>Back to Deck</Text>
          </Button>
        </Container>
      );
    }
  
    return (
      <Swiper showsButtons showsPagination={false} loop={false}>
        {deck.questions.map(({ question, answer }, index) => (
          <Container key={index}>
            <Text>{index+1}/{deck.questions.length}</Text>
            <Toggler question={question} answer={answer} />
            <Button onPress={() => this.checkProgressHandler(index, true)}>
              <Text>Correct</Text>
            </Button>
            <Button onPress={() => this.checkProgressHandler(index, false)}>
              <Text>Incorrect</Text>
            </Button>
          </Container>
        ))}
      </Swiper>
    );
  }
}

const mapStateToProps = ({ decks }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
});

export default connect(mapStateToProps)(DeckGame);

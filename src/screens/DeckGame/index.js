import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import { Deck, Toggler } from '../../components';
import { Button, Container, HeaderText, HeaderButton, Text } from './styles';
import { colors } from '../../utils';
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

  setTomorrowNotification = () => (
    notifications.clearLocalNotification()
      .then(notifications.setLocalNotification)
  )

  onTryAnswerHandler = answer => {
    console.log(answer);
  }

  render() {
    const { deck } = this.props;

    return (
      <Swiper showsButtons showsPagination={false} loop={false}>
        {deck.questions.map(({ question, answer }, index) => (
          <Container key={index}>
            <Text>{index+1}/{deck.questions.length}</Text>
            <Toggler question={question} answer={answer} />
            <Button onPress={() => this.onTryAnswerHandler('correct')}>
              <Text>Correct</Text>
            </Button>
            <Button onPress={() => this.onTryAnswerHandler('incorrect')}>
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

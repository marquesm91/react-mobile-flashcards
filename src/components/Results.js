import React, { Component, Fragment } from 'react';
import { withNavigation } from 'react-navigation';
import AnimateNumber from 'react-native-animate-number';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import { Deck, Toggler } from '../components';
import { colors, modifiers, constants } from '../utils';
import notifications from '../notifications';
import { resetResults, setSpoiler } from '../redux/actions';
import { Button, ScrollViewContainer, ContainerCard, Container, HeaderButton, Text, Wrapper } from '../styles';

class Quiz extends Component {
  componentDidMount() {
    this.setTomorrowNotification();
  }

  setTomorrowNotification = () => (
    notifications.clearLocalNotification()
      .then(notifications.setLocalNotification)
  )

  checkProgressHandler = (key, value) => {
    const { setResult, deck } = this.props;
    setResult(key, value);

    if (key < deck.questions.length) {
      this.quizSwiper.scrollBy(1);
    }
  }

  resetGame = () => {
    const { resetResults, resetSpoiler } = this.props;

    resetResults();
    resetSpoiler();
  }

  render() {
    const { results, deck, corrects, total, navigation } = this.props;

    const arr = modifiers.json_to_array(results);

    return (
      <ScrollViewContainer>
        <Container>
          <Wrapper flex={2} justify="center" align="center">
            <Text size={16}>
              You answer <Text bold size={22} color={colors.purple}>{corrects}</Text> {modifiers.use_plural('card', corrects)} correctly!
            </Text>
          </Wrapper>
          <Wrapper justify="center" align="center" style={{ marginTop: 20, marginBottom: 20 }}>
            <Text size={36} bold color={colors.purple}>
              <AnimateNumber
                value={Math.floor((corrects / total) * 100)}
                timing={(interval, progress) => (
                  // fast start, slow end
                  interval * (1 - Math.cos(Math.PI * progress)) * 1.8
                )}
                countBy={2}
                formatter={val => `${val}%`}
              />
            </Text>
            <Text size={23} bold>of total</Text>
          </Wrapper>
          <Wrapper flex={2} justify="center" align="center">
            <Button primary onPress={() => navigation.navigate(constants.DECK_DETAIL)}>
              <Text primary bold center size={16}>Back to Deck</Text>
            </Button>
            <Button secondary onPress={this.resetGame}>
              <Text secondary bold center size={16}>Restart Quiz</Text>
            </Button>
          </Wrapper>
        </Container>
        <Container>
          {arr.map((result, index) => (
            <ContainerCard key={index}>
              <Wrapper>
                <Text size={14} bold>Card #{index+1}</Text>
                <Text size={12} bold color={modifiers.get_color_by_result(results, index)}>{modifiers.get_label_by_result(results, index)}</Text>
              </Wrapper>
              <Wrapper flex={3} align="flex-end">
                <Text size={12} bold>{deck.questions[index].question}</Text>
                <Text size={10}>{deck.questions[index].answer}</Text>
              </Wrapper>
            </ContainerCard>
          ))}
        </Container>
      </ScrollViewContainer>
    );
  }
}

const mapStateToProps = ({ decks, results }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
  results,
});

const mapDispatchToProps = dispatch => ({
  resetResults: (key, value) => dispatch(resetResults(key, value)),
  resetSpoiler: () => dispatch(setSpoiler(-1)),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Quiz));

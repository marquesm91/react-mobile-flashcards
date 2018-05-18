import React, { Component, Fragment } from 'react';
import AnimateNumber from 'react-native-animate-number';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import { Deck, Toggler } from '../components';
import { colors, modifiers } from '../utils';
import notifications from '../notifications';
import {
  Button,
  ScrollViewContainer,
  ContainerCard,
  Container,
  HeaderButton,
  Text,
  Wrapper,
  SwipperButton,
} from './styles';

class DeckGame extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text color={colors.purple} size={20} bold>
        Quiz Game
      </Text>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text size={18} bold>Back</Text>
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

    if (key < this.props.deck.questions.length) {
      this.gameSwiper.scrollBy(1);
    }
  }

  getColorByResult = (index) => (
    this.state.results[index]
      ? colors.green
      : colors.red
  )

  getLabelByResult = (index) => (
    this.state.results[index]
      ? 'Correct'
      : 'Incorrect'
  )

  resetGame = () => this.setState({ results: {} });

  render() {
    const { results } = this.state;
    const { deck } = this.props;

    if (!deck.questions.length) {
      return (
        <Container centered>
          <Text size={16}>
            This quiz <Text size={16} bold>doesn't have questions</Text> yet!
          </Text>
          <Button primary style={{ marginTop: 50 }} onPress={() => this.props.navigation.navigate('DeckEditMode')}>
            <Text primary bold center size={16}>Create Cards</Text>
          </Button>
        </Container>
      );
    }

    const arr = modifiers.json_to_array(results);

    if (arr.length === deck.questions.length) {
      const corrects = arr.filter(a => a).length;
      const total = deck.questions.length;

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
              <Button primary onPress={() => this.props.navigation.navigate('DeckDetail')}>
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
                  <Text size={12} bold color={this.getColorByResult(index)}>{this.getLabelByResult(index)}</Text>
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

    return (
      <Swiper
        bounces
        showsButtons
        showsPagination={false}
        loop={false}
        ref={ref => this.gameSwiper = ref}
        buttonColor={colors.purple}
        nextButton={<SwipperButton>›</SwipperButton>}
        prevButton={<SwipperButton>‹</SwipperButton>}
      >
        {deck.questions.map(({ question, answer }, index) => (
          <Container key={index}>
            <Wrapper justify="center" align="center">
              <Toggler question={question} answer={answer} spoiler={results[index] !== undefined} />
            </Wrapper>
            <Wrapper justify="center" align="center">
              {results[index] !== undefined
                ? <Text size={20} bold center>Marked as <Text size={20} bold color={this.getColorByResult(index)}>{this.getLabelByResult(index)}</Text></Text>
                : <Fragment>
                  <Button correct onPress={() => this.checkProgressHandler(index, true)}>
                    <Text correct bold center size={16}>Correct</Text>
                  </Button>
                  <Button danger onPress={() => this.checkProgressHandler(index, false)}>
                    <Text danger bold center size={16}>Incorrect</Text>
                  </Button>
                </Fragment>
              }
            </Wrapper>
            <Wrapper justify="center" align="center">
              <Text size={16} bold>{index + 1} of {deck.questions.length}</Text>
            </Wrapper>
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

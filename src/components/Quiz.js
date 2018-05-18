import React, { Component, Fragment } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper'
import { Toggler } from '../components';
import { colors, modifiers, constants } from '../utils';
import notifications from '../notifications';
import { setResult, setSpoiler } from '../redux/actions';
import { Button, Container, HeaderButton, Text, Wrapper, SwipperButton } from '../styles';

class Quiz extends Component {
  state = {
    targetTaps: 0,
    taps: 0,
  }

  checkProgressHandler = (key, value, alreadyAnswered) => {
    const { setResult, deck, hasSpoiler, targetSpoiler } = this.props;

    if (hasSpoiler && this.state.targetTaps === key && targetSpoiler === key) {
      setResult(key, value);

      this.setState(({ targetTaps }) => ({
        taps: 0,
        targetTaps: targetTaps + 1
      }), this.canISwipe());
    } else {
      this.setState(({ taps }) => ({ taps: taps + 1 }));
    }
  }

  renderFooter = (key, alreadyAnswered) => {
    const { hasSpoiler, targetSpoiler } = this.props;
    const { taps, targetTaps } = this.state;
 
    /* Render nothing if user check answer and tap on any action buttons  */
    if (alreadyAnswered) {
      return null;
    }

    /* Multiple taps and hasn't spoiler and target taps are diffrent from active swiper view*/
    if (taps >= 1 && !hasSpoiler && (targetTaps === key || targetSpoiler === -1)) {
      return <Text>Hey! You <Text size={12} bold>have to</Text> check your answer!</Text>;
    }

    return null;
  }

  canISwipe = () => {
    const { questions } = this.props.deck;
    this.props.setSpoiler(-1);

    // +1 because it is an index
    if ((this.state.targetTaps + 1) < questions.length) {
      this.quizSwiper.scrollBy(1);
    }
  }

  onNextHandler = () => {
    this.setState(({ targetTaps }) => ({
      taps: 0,
      targetTaps: targetTaps + 1
    }), this.canISwipe());
  }

  onPrevHandler = () => {
    this.setState(({ targetTaps }) => ({
      taps: 0,
      targetTaps: targetTaps - 1
    }));
  }

  _onMomentumScrollEnd = (e, { index }) => {
    /* Only change if you really go to another swiper view */
    if (this.state.targetTaps !== index) {
      this.setState({ taps: 0, targetTaps: index });
    }
  }

  render() {
    const { results, deck, navigation } = this.props;

    if (!deck.questions.length) {
      return (
        <Container centered>
          <Text size={16}>
            This quiz <Text size={16} bold>doesn't have questions</Text> yet!
          </Text>
          <Button primary style={{ marginTop: 50 }} onPress={() => navigation.navigate(constants.DECK_EDIT_MODE)}>
            <Text primary bold center size={16}>Create Cards</Text>
          </Button>
        </Container>
      );
    }

    return (
      <Swiper
        bounces
        showsButtons
        showsPagination={false}
        loop={false}
        ref={ref => this.quizSwiper = ref}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
        buttonColor={colors.purple}
        nextButton={<SwipperButton onPress={this.onNextHandler}>›</SwipperButton>}
        prevButton={<SwipperButton onPress={this.onPrevHandler}>‹</SwipperButton>}
      >
        {deck.questions.map(({ question, answer }, index) => (
          <Container key={index}>
            <Wrapper justify="center" align="center">
              <Toggler question={question} answer={answer} spoiler={results[index] !== undefined} index={index} />
            </Wrapper>
            <Wrapper justify="center" align="center">
              {results[index] !== undefined
                ? <Text size={20} bold center>Marked as <Text size={20} bold color={modifiers.get_color_by_result(results, index)}>{modifiers.get_label_by_result(results, index)}</Text></Text>
                : <Fragment>
                    <Button correct onPress={() => this.checkProgressHandler(index, true)}>
                      <Text correct bold center size={16}>Correct</Text>
                    </Button>
                    <Button danger onPress={() => this.checkProgressHandler(index, false)}>
                      <Text danger bold center size={16}>Incorrect</Text>
                    </Button>
                    {this.renderFooter(index, results[index] !== undefined)}
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

const mapStateToProps = ({ decks, results, inputs }) => ({
  deck: decks.list.find(l => l.title === decks.selected),
  hasSpoiler: (inputs.spoiler !== -1),
  targetSpoiler: inputs.spoiler,
  results,
});

const mapDispatchToProps = dispatch => ({
  setResult: (key, value) => dispatch(setResult(key, value)),
  setSpoiler: (spoiler) => dispatch(setSpoiler(spoiler)),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Quiz));

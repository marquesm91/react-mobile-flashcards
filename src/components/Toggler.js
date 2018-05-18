import React, { Fragment, PureComponent } from 'react';
import { Button, Text } from './styles';

class Toggler extends PureComponent {
  state = {
    show: false,
  }

  toggle = () => this.setState(({ show }) => ({ show: !show }));

  render() {
    const { show } = this.state;
    const { question, answer, spoiler } = this.props;

    if (spoiler) {
      return (
        <Fragment>
          <Text center bold size={30}>{question}</Text>
          <Text center size={24}>{answer}</Text>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Text center bold size={30}>{show ? answer : question}</Text>
        <Button ghost onPress={() => this.setState(({ show }) => ({ show: !show }))}>
          <Text ghost center bold size={14}>{show ? 'Question' : 'Answer'}</Text>
        </Button>
      </Fragment>
    );
  }
}

export default Toggler;
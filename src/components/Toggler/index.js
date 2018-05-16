import React, { Fragment, PureComponent } from 'react';
import { Button, Text } from './styles';

class Toggler extends PureComponent {
  state = {
    show: false,
  }

  toggle = () => this.setState(({ show }) => ({ show: !show }));

  render() {
    const { show } = this.state;
    const { question, answer } = this.props;

    return (
      <Fragment>
        <Text>{show ? answer : question}</Text>
        <Button onPress={() => this.setState(({ show }) => ({ show: !show }))}>
          <Text>{show ? 'Question' : 'Answer'}</Text>
        </Button>
      </Fragment>
    );
  }
}

export default Toggler;
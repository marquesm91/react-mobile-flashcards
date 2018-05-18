import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { DismissKeyboardView } from '../components';
import { colors, modifiers, constants } from '../utils';
import { setDirty, setInputValue } from '../redux/actions';
import { Button, HeaderButton, Text, Input, Wrapper } from '../styles';

class _Input extends Component {
  state = {
    height: '',
  }

  changeInputHandler = (value) => {
    const { name, setDirty, setInputValue } = this.props;

    setDirty(true);
    setInputValue(name, value);
  }

  render() {
    const { value, placeholder } = this.props;
    const { height } = this.state;

    return (
      <Input
        placeholder={placeholder}
        onChangeText={value => this.changeInputHandler(value)}
        value={value}
        size={16}
        height={Math.max(40, height)}
        onContentSizeChange={event => (
          this.setState({ height: event.nativeEvent.contentSize.height }
        ))}
      />
    );
  }
}

const mapStateToProps = ({ decks, inputs }, ownProps) => ({
  deck: decks.list.find(l => l.title === decks.selected),
  value: inputs[ownProps.name] ? inputs[ownProps.name] : '',
});

const mapDispatchToProps = dispatch => ({
  setDirty: (dirty) => dispatch(setDirty(dirty)),
  setInputValue: (key, value) => dispatch(setInputValue(key, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(_Input);

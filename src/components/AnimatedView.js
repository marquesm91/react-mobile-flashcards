import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { KeyboardAvoidingViewContainer, Container } from '../styles';

class AnimatedView extends Component {
  state = {
    fadeAnim: new Animated.Value(this.props.from || 0),
  }

  componentDidMount() {
    const { duration, to } = this.props;
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: (to || 1),
        duration: duration,
      }
    ).start();
  }

  render() {
    const { fadeAnim } = this.state;
    const { children, style } = this.props;

    return (
      <Animated.View
        style={[
          { flex: 1, justifyContent: 'center', opacity: fadeAnim },
          style
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}

export default AnimatedView;
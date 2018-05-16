import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import notifications from './src/notifications';
import { createRootNavigator } from './RootNavigator';

class App extends Component {
  componentDidMount() {
    notifications.setLocalNotification();
  }

  render() {
    const Navigator = createRootNavigator();

    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

export default App;

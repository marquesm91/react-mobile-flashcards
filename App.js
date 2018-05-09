import React from 'react';
import { createRootNavigator } from './RootNavigator';

const App = () => {
  const Navigator = createRootNavigator();

  return (
    <Navigator />
  );
};

export default App;

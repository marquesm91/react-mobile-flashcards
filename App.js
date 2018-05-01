import React from 'react';
import createNavigator from './RootNavigator';

const App = () => {
  const Routes = createNavigator();

  return (
    <Routes />
  );
};

export default App;

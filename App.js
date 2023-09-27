import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigation/mainstack';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <MainStack></MainStack>
      </SafeAreaView>
    </NavigationContainer>
  );
};
export default App;

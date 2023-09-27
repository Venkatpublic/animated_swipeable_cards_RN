import React from 'react';
import {View} from 'react-native';

import HomeScreen from '../screens/home';
import ExpandedScreen from '../screens/expanded';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import DATA from '../utils/data';
const Stack = createSharedElementStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={HomeScreen} />
      <Stack.Screen
        sharedElements={(route, otherRoute, showing) => {
          const {index} = route.params;
          return ['bottomsheet.bg', `image.${DATA[index].header}.bg`];
        }}
        name="Expanded"
        component={ExpandedScreen}
      />
    </Stack.Navigator>
  );
};
export default MainStack;

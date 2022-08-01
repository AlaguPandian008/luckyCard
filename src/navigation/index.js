import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenName from './screenNames';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from './NavigationService';

export const AppStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.DASHBOARD}
          component={ScreenName.Dashboard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const SCREENS = {DASHBOARD: 'Dashboard'};

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAIL, STATISTICS } from '../../constants/path';
import { Detail, Statistics } from '../../containers';
import { HeaderLeft, headerTintColor, headerStyle } from '../Header';
import { COLOR } from '../../constants/theme';

const cardStyle = {
  backgroundColor: COLOR.MAIN,
};
const Stack = createStackNavigator();

function StatisticsNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={STATISTICS}
      screenOptions={{
        cardStyle,
        headerTintColor,
        headerStyle,
      }}
    >
      <Stack.Screen
        name={STATISTICS}
        component={Statistics}
        options={{
          headerLeft: () => <HeaderLeft />,
          title: 'Statistics',
        }}
      />
      <Stack.Screen
        name={DETAIL}
        component={Detail}
        options={{
          title: 'Detail',
        }}
      />
    </Stack.Navigator>
  );
}

export default StatisticsNavigator;

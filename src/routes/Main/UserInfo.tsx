import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { USER_INFO } from '../../constants/path';
import { UserInfo } from '../../components/pages';
import { HeaderLeft, headerTintColor, headerStyle } from '../Header';
import { COLOR } from '../../constants/theme';

const cardStyle = {
  backgroundColor: COLOR.MAIN,
};
const Stack = createStackNavigator();
function UserInfoNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={USER_INFO}
      screenOptions={{
        cardStyle,
        headerTintColor,
        headerStyle,
      }}
    >
      <Stack.Screen
        name={USER_INFO}
        component={UserInfo}
        options={{
          headerLeft:() => <HeaderLeft />,
          title: 'User info',
        }}
      />
    </Stack.Navigator>
  )
}

export default UserInfoNavigator;

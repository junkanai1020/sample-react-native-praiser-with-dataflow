import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, dismiss, TextField } from '../../atoms';
import { useControlledComponent } from '../../../lib/hooks';
import { UiContext } from '../../../contexts';
import { Status } from '../../../contexts/ui';
import { Todos } from '../../../domain/models';
import useNetworker from '../../../lib/hooks/use-networker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
  },
});

interface Props {
  actions: {
    setTodos: (todos: Todos.Model) => void;
  };
}

export default function SignUp(props: Props) {
  const { setApplicationState } = React.useContext(UiContext);
  const networker = useNetworker();
  const mailAddress = useControlledComponent('');
  const password = useControlledComponent('');
  const { setTodos } = props.actions;

  const registerUser = React.useCallback(async () => {
    await networker(async () => {
      setApplicationState(Status.AUTHORIZED);
      setTodos({});
    });
  }, [setApplicationState, mailAddress.value, networker, password.value, setTodos]);

  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      <View style={styles.container}>
        <TextField
          label="email"
          value={mailAddress.value}
          onChangeText={mailAddress.onChangeText}
          style={styles.text}
          autoCompleteType="email"
        />
        <TextField
          label="password"
          value={password.value}
          onChangeText={password.onChangeText}
          style={styles.text}
          autoCompleteType="password"
          secureTextEntry={true}
        />
        <Button
          onPress={registerUser}
          style={styles.button}
          label="Register"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

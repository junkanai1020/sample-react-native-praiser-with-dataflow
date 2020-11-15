import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { useControlledComponent, useNetworker } from '../../../lib/hooks';
import { Button, dismiss, TextField } from '../../atoms';
import SignInWithGoogle from './SignInWithGoogle';
import { UiContext } from '../../../contexts';
import { Status } from '../../../contexts/ui';
import { Todos } from '../../../domain/models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  text: {
    marginVertical: 20,
  },
  button: {
    marginTop: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

interface Props {
  actions: {
    setTodos: (todos: Todos.Model) => void;
  };
}

export default function SignIn(props: Props) {
  const { setApplicationState } = React.useContext(UiContext);
  const networker = useNetworker();
  const mailAddress = useControlledComponent('');
  const password = useControlledComponent('');
  const { setTodos } = props.actions;

  const signInWithPassword = React.useCallback(async () => {
    await networker(async () => {
      setApplicationState(Status.AUTHORIZED);
      setTodos({});
    });
  }, [mailAddress.value, password.value, setApplicationState, networker, setTodos]);

  return (
    <TouchableWithoutFeedback onPress={dismiss}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
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
        </View>
        <View style={styles.buttonContainer}>
          <SignInWithGoogle />
          <Button onPress={signInWithPassword} label="SignIn" style={styles.button} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import IconButton from '../../atoms/IconButton';
import SafeAreaView from 'react-native-safe-area-view';
import { useNavigation } from '@react-navigation/native';
import TextField, { dismiss } from '../../atoms/TextField';
import Button from '../../atoms/Button';
import { COLOR } from '../../../constants/theme';
import { Todo } from '../../../domain/models';
import { useControlledComponent } from '../../../lib/hooks/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  text: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

interface Props {
  actions: {
    addTodo: (newValues: Todo.Values) => void;
  };
}

export default function Input(props: Props) {
  const title = useControlledComponent('');
  const detail = useControlledComponent('');

  const { goBack } = useNavigation();
  const back = React.useCallback(() => {
    goBack();
  }, [goBack]);

  const addTodo = React.useCallback(() => {
    props.actions.addTodo({
      title: title.value,
      detail: detail.value,
    });
    back();
    title.onChangeText('');
    detail.onChangeText('');
  }, [back, title, detail, props.actions]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <View style={styles.container}>
          <IconButton
            icon="close"
            size={30}
            iconColor={COLOR.PRIMARY}
            onPress={back}
            style={styles.iconButton}
          />
          <TextField
            label="Title"
            value={title.value}
            onChangeText={title.onChangeText}
            style={styles.text}
          />
          <TextField
            label="Detail"
            value={detail.value}
            onChangeText={detail.onChangeText}
            style={styles.text}
          />
          <Button
            onPress={addTodo}
            label="Add"
            style={styles.button}
            disabled={!title.value}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

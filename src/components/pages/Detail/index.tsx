import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import TextField, { dismiss } from '../../atoms/TextField';
import Button from '../../atoms/Button';
import { useControlledComponent } from '../../../lib/hooks';
import { UiContext } from '../../../contexts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textField: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
});

interface TodoEditActions {
  changeTodo: (
    id: string,
    newValue: {
      title: string;
      detail: string;
    },
  ) => void;
}

interface Props {
  actions: TodoEditActions;
}

interface Params {
  id: string;
  isEditable: boolean;
  title: string;
  detail: string;
}

export default function Detail(props: Props) {
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const { id, isEditable, title: titleInitialValue, detail: detailInitialValue } = params;

  const title = useControlledComponent(titleInitialValue);
  const detail = useControlledComponent(detailInitialValue);

  const { setSnackbar } = React.useContext(UiContext);
  const onSubmit = React.useCallback(() => {
    props.actions.changeTodo(id, {
      title: title.value,
      detail: detail.value,
    });
    dismiss();
    setSnackbar({
      visible: true,
      message: 'edit is completed.',
      label: 'Done',
    });
  }, [title.value, detail.value, id, props.actions, setSnackbar]);

  return (
    <View style={styles.container}>
      <TextField
        disabled={!isEditable}
        label="title"
        value={title.value}
        onChangeText={title.onChangeText}
        style={styles.textField}
      />
      <TextField
        disabled={!isEditable}
        label="detail"
        value={detail.value}
        onChangeText={detail.onChangeText}
        style={styles.textField}
      />
      {isEditable && (
        <Button onPress={onSubmit} label="Submit" style={styles.button} />
      )}
    </View>
  )
}

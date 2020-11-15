import React from 'react';
import { useDispatch } from 'react-redux';

import { Todo } from '../domain/models';
import * as Todos from '../modules/todos';
import { Input } from '../components/pages';

export default function ConnectedInput() {
  const dispatch = useDispatch();
  const actions = React.useMemo(
    () => ({
      addTodo(newValues: Todo.Values) {
        const newTodo = Todo.factory(newValues);
        dispatch(Todos.add(newTodo));
      },
    }),
    [dispatch],
  );

  if (!actions) {
    return null;
  }

  return <Input actions={actions} />;
}

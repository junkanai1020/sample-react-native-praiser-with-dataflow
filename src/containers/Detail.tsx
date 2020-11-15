import React from 'react';
import { useDispatch } from 'react-redux';

import { Todo } from '../domain/models';
import * as Todos from '../modules/todos';
import { Detail } from '../components/pages';

export default function ConnectedDetail() {
  const dispatch = useDispatch();

  const actions = React.useMemo(
    () => ({
      changeTodo(id: string, newValues: Todo.Values) {
        const newTodo = Todo.factory(newValues);
        dispatch(Todos.update(id, newTodo));
      },
    }),
    [dispatch],
  );

  if (!actions) {
    return null;
  }

  return <Detail actions={actions} />;
}

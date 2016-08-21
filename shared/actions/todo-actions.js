import apiCaller from '../../utils/apiCaller';

export function createTodo(payload) {
  return {
    type: 'CREATE_TODO',
    payload
  }
}

export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}


export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}


export function getTodos(payload) {
  return {
    type: 'GET_TODOS',
    payload
  }
}


export function fetchTodos() {
  return (dispatch) => {
    return apiCaller('todos')
      .then(payload => {
        console.log('Response body:', payload);
        dispatch(getTodos(payload))
      })
      .catch(err => {
        console.log('Error during fetch:', err);
      })
  }
}

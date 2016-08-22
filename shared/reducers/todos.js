import Immutable from 'immutable';


export default function todoReducer(state = [], action) {
  switch(action.type) {
    case 'CREATE_TODO':
      return state.concat(action.payload);
    case 'EDIT_TODO':
      return state.set(action.id, action.text);
    case 'DELETE_TODO':
      return state.delete(action.id);
    case 'GET_TODOS':
      console.log('GET_TODOS -> current state:', state, 'action.payload:', action.payload);
      return state.concat(action.payload);
    default:
      return state;
  }
}

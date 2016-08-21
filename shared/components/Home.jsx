import React from 'react';
import TodosView from './TodosView';
import TodosForm from './TodosForm';
import * as todoActions from '../actions/todo-actions';
import {connect} from 'react-redux';



class Home extends React.Component {

  static needs = [
    todoActions.fetchTodos
  ]

  render() {
    const { todos, editTodo, deleteTodo, createTodo, getTodos} = this.props;

    return (
      <div id="todo-list">
        <TodosView
          todos={todos}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          getTodos={getTodos} />
        <TodosForm
          createTodo={createTodo} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
}

const mapActionsToProps = {
  createTodo: todoActions.createTodo,
  editTodo: todoActions.editTodo,
  deleteTodo: todoActions.deleteTodo,
  getTodos: todoActions.getTodos
}

export default connect(mapStateToProps, mapActionsToProps)(Home)

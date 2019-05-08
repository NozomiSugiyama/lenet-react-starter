// @flow
import React from 'react'
import './App.css'
import ToDo from '../components/ToDo'
import InputToDo from '../components/InputToDo'
import { connect } from 'react-redux'
import Actions from '../actions/AppActions'
import type { ToDoItem } from '../reducers/reducer'

type Props = {
  handleAddToDo: (toDo: ToDoItem) => void,
  handleDeleteToDo: (toDo: ToDoItem) => void,
  toDoList: ToDoItem[]
}

const App = ({ handleAddToDo, handleDeleteToDo, toDoList }: Props) => {
  return (
    <div className="App">
      <main>
        <InputToDo save={(toDo: ToDoItem) => handleAddToDo(toDo)} />
        <hr />
        <ToDo toDoList={toDoList} deleteToDo={toDo => handleDeleteToDo(toDo)} />
      </main>
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    handleAddToDo(value) {
      dispatch(Actions.addToDo(value))
    },
    handleDeleteToDo(value) {
      dispatch(Actions.deleteToDo(value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

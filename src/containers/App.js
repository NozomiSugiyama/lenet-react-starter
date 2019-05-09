// @flow
import React, { useEffect } from 'react'
import './App.css'
import ToDo from '../components/ui/ToDo'
import InputToDo from '../components/ui/InputToDo'
import { connect } from 'react-redux'
import Actions from '../actions/toDoList'
import type { ToDoItem, CreateToDoItem } from '../types/toDo'

type Props = {
  handleFetchToDo: () => void,
  handleCreateToDo: (toDo: CreateToDoItem) => void,
  handleDeleteToDo: (toDo: ToDoItem) => void,
  toDoList: ToDoItem[]
}

const App = ({ handleFetchToDo, handleCreateToDo, handleDeleteToDo, toDoList }: Props) => {
  useEffect(() => handleFetchToDo(), [])
  return (
    <div className="App">
      <main>
        <InputToDo save={(toDo: CreateToDoItem) => handleCreateToDo(toDo)} />
        <hr />
        <ToDo toDoList={toDoList} deleteToDo={toDo => handleDeleteToDo(toDo)} />
      </main>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    toDoList: state.toDoList.toDoList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFetchToDo() {
      dispatch(Actions.fetchToDo())
    },
    handleCreateToDo(value) {
      dispatch(Actions.createToDo(value))
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

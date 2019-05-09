// @flow
import React, { useEffect } from 'react'
import './App.css'
import ToDo from '../components/ui/ToDo'
import InputToDo from '../components/ui/InputToDo'
import { connect } from 'react-redux'
import Actions from '../actions/toDoList'
import type { ToDoItem } from '../types/toDo'

type Props = {
  handleFetchToDo: () => void,
  handleAddToDo: (toDo: ToDoItem) => void,
  handleDeleteToDo: (toDo: ToDoItem) => void,
  toDoList: ToDoItem[]
}

const App = ({ handleFetchToDo, handleAddToDo, handleDeleteToDo, toDoList }: Props) => {
  useEffect(() => handleFetchToDo(), [])
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
  return {
    toDoList: state.toDoList.toDoList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFetchToDo() {
      dispatch(Actions.fetchToDo())
    },
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

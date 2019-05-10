// @flow
import React, { useEffect } from 'react'
import './App.css'
import ToDo from '../components/ui/ToDo'
import InputToDo from '../components/ui/InputToDo'
import { connect } from 'react-redux'
import * as Actions from '../actions/toDoList'
import type { ToDoItem, CreateToDoItem } from '../types/toDo'

type Props = {
  handleFetchToDoList: () => void,
  handleCreateToDo: (toDo: CreateToDoItem) => void,
  handleDeleteToDo: (toDo: ToDoItem) => void,
  toDoList: ToDoItem[]
}

const App = ({ handleFetchToDoList, handleCreateToDo, handleDeleteToDo, toDoList }: Props) => {
  console.log(toDoList)
  useEffect(() => handleFetchToDoList(), [])
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
    handleFetchToDoList() {
      dispatch(Actions.fetchToListDoList())
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

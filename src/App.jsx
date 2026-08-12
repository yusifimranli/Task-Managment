import React from 'react'
import Router from './Router/Router'
import TaskProvider from './features/tasks/TaskContext'

function App() {
  return (
    <TaskProvider>
      <Router />
    </TaskProvider>
  )
}

export default App
import React, { createContext, useEffect, useState } from 'react'

export const TaskContext = createContext()

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const addTask = async (task) => {
    const res = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks(prev => [...prev, data])
  }

  const deleteTask = async (id) => {
    const oldTasks = tasks

    setTasks(tasks.filter(task => task.id !== id))

    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        throw new Error('Task silinmədi')
      }
    } catch (error) {
      setTasks(oldTasks)
      alert('Task silinərkən xəta baş verdi')
    }
  }

  const updateTask = async (task) => {
    const res = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: task.title
      })
    })

    const data = await res.json()

    setTasks(prev =>
      prev.map(item =>
        item.id === data.id ? data : item
      )
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider
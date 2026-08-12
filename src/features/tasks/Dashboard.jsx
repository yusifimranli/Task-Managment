import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../auth/AuthProvider'
import { TaskContext } from './TaskContext'

function Dashboard() {
  const { tasks, addTask, deleteTask, updateTask } = useContext(TaskContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTask, setNewTask] = useState('')
  const [editTask, setEditTask] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  

      const handleAddTask = async () => {
        if (!newTask.trim()) {
          alert('Task adı daxil et')
          return
        }

        const task = {
          title: newTask,
          completed: false
        }

        await addTask(task)

        setNewTask('')
        setIsModalOpen(false)
      }


    const handleDeleteTask = async (id) => {
      await deleteTask(id)
    }

    const handleEditTask = (task) => {
      setEditTask(task)
      setEditTitle(task.title)
    }

    const handleUpdateTask = async () => {
      if (!editTitle.trim()) {
        alert('Task adı daxil et')
        return
      }

      await updateTask({
        ...editTask,
        title: editTitle
      })

      setEditTask(null)
      setEditTitle('')
    }


      
      const navigate = useNavigate()
      const { dispatch } = useContext(AuthContext)

      const handleLogout = () => {
        localStorage.removeItem('token')

        dispatch({
          type: 'LOGOUT'
        })

        navigate('/')
      }

      
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">TaskManager</h1>
            <p className="text-xs text-slate-500">Dashboard</p>
          </div>
          <button onClick={handleLogout} className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition"
          >Logout</button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back 👋</h2>
          <p className="mt-2 text-slate-500">Manage your tasks and keep track of your progress.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Tasks</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">{tasks.length}</h3></div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-xl">
                📋
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Completed</p>

                <h3 className="text-3xl font-bold text-slate-900 mt-2">0</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-xl">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Pending</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2"> {tasks.filter(task => !task.completed).length}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl">⏳</div>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your tasks from here.</p>
            </div>
            <div className="flex gap-2">
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
            >
              + Add Task
            </button>
          </div>
          </div>

          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div key={task.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                         ${ task.completed
                        ? 'bg-green-100'
                        : 'bg-indigo-100'
                          }`}>
                    {task.completed ? '✅' : '📝'}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${ task.completed
                                          ? 'text-slate-400 line-through'
                                        : 'text-slate-900' }`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {task.completed ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
          {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Add New Task
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Create a new task for your dashboard.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  ✕
                </button>
              </div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Task title
              </label>
              <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter task title..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => {
                    setIsModalOpen(false)
                    setNewTask('')
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button onClick={handleAddTask}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}

        {editTask && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
              <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
                <h2 className="text-xl font-bold text-slate-900">Edit Task</h2>
                <p className="text-sm text-slate-500 mt-1">Update your task.</p>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mt-5 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-500"
                />
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => {
                      setEditTask(null)
                      setEditTitle('')
                    }}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  >
                    Cancel
                  </button>
                  <button onClick={handleUpdateTask}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  )
}

export default Dashboard

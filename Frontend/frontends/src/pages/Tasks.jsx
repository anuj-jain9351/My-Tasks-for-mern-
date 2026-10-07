import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Tasks = () => {
  const [task, setTask] = useState([])
  const [createTask, setCreateTask] = useState(
    {
      title: "",
      description: "",
      status:""
    }
  )

  const [editTask, setEditTask] = useState(null)
  const [search,setSearch] = useState("")
  const [status,setStatus] = useState("")


  const handleChange = (e) => {
    setCreateTask({
      ...createTask,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post("https://my-tasks-backend.onrender.com/api/tasks", createTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }

      })
      api()
      console.log(response.data)



    } catch (error) {
      console.log(error.response?.data)

    }


    setCreateTask({
      title: "",
      description: "",
    })

  }


  const api = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`https://my-tasks-backend.onrender.com/api/tasks?search=${search}&status=${status} `, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

    }
    )
    console.log(response.data?.usercreate)
    setTask(response.data?.usercreate)
  }


  useEffect(() => {
    api()
  }, [search,status])





  const handleEdit = (e) => {
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value
    })
  }

  const editSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.patch(`https://my-tasks-backend.onrender.com/api/tasks/${editTask._id}`, editTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }

      })
      api()
      console.log(response.data)
      



    } catch (error) {
      console.log(error.response?.data)
    }
  }



  const DeleteTask = async(e)=>{
    try{
      const token = localStorage.getItem("token")
      const response = await axios.delete(`https://my-tasks-backend.onrender.com/api/tasks/${e._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }

      })
       api()
      console.log(response.data)

      // api()

    }catch(error){
      console.log(error.response?.data)
    }
  }


  return (
    <div className="min-h-screen bg-gray-100  p-5 ">


<div className="flex gap-4 mb-8">
  <input type="text" value={search.title} onChange={(e) => setSearch(e.target.value)} name="title"  placeholder='Search...'  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
  <select value={status} onChange={(e)=>setStatus(e.target.value)}  className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
>
    <option value="">All</option>
    <option value="pending">Pending</option>
    <option value="In Process">In Progress</option>
    <option value="Completed">Completed</option>
  </select>
</div>
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
  <h2 className="text-xl font-semibold text-gray-800 mb-5">
    Create New Task
  </h2>

  <form onSubmit={handleSubmit} className="flex gap-4 items-end">

    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Title
      </label>
      <input
        type="text"
        value={createTask.title}
        onChange={handleChange}
        name="title"
        placeholder="Enter Title"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <input
        type="text"
        value={createTask.description}
        onChange={handleChange}
        name="description"
        placeholder="Enter Description"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div> 

    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select
        value={createTask.status}
        onChange={handleChange}
        name="status"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg"
    >
      Create Task
    </button>

  </form>
</div>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">
  My Tasks
</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {task.map((e) => {
          return (
            <div key={e._id}  className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h1 className="text-xl font-semibold text-gray-800">{e.title}</h1>
              <h2 className="text-gray-600 mt-2">{e.description}</h2>
              <h2 className="text-sm font-medium text-blue-600 mt-3">{e.status}</h2>
              <div className="flex gap-3 mt-4">
                <button onClick={(() => {
                  console.log(e)
                  setEditTask(e)
                })} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Edit</button>




                <button onClick={(() => {
                  console.log(e)
                  DeleteTask(e)
                })} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
              </div>



            </div>)
        })}
      </div>

<div className="mt-8">
  {editTask && (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Edit Task
      </h2>

      <form onSubmit={editSubmit} className="flex gap-4 items-end">

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>

          <input
            type="text"
            value={editTask.title}
            name="title"
            onChange={handleEdit}
            placeholder="Enter Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>

          <input
            type="text"
            value={editTask.description}
            name="description"
            onChange={handleEdit}
            placeholder="Enter Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>

          <select
            value={editTask.status}
            name="status"
            onChange={handleEdit}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="In Process">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg"
        >
          Update Task
        </button>

      </form>

    </div>
  )}
</div>
      
    </div>
  )
}

export default Tasks




{/*
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
  <h2 className="text-xl font-semibold text-gray-800 mb-5">
    Create New Task
  </h2>

  <form onSubmit={handleSubmit} className="flex gap-4 items-end">

    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Title
      </label>
      <input
        type="text"
        value={createTask.title}
        onChange={handleChange}
        name="title"
        placeholder="Enter Title"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <input
        type="text"
        value={createTask.description}
        onChange={handleChange}
        name="description"
        placeholder="Enter Description"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select
        value={createTask.status}
        onChange={handleChange}
        name="status"
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="In Process">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>

    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg"
    >
      Create Task
    </button>

  </form>
</div> 

*/}
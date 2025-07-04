import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { PiPushPinDuotone, PiPushPinFill } from "react-icons/pi";


function App() {

  const [todo, setTodo] = useState(" ");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)

    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false, isPinned: false }]);
    setTodo(""); // Clear the input field after adding
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value); // Clear the input field after adding
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  }

  const pinTodo = (e, id) => {
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isPinned = !newTodos[index].isPinned;
    setTodos(newTodos);
    saveToLS();
  }


  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  }

  return (
    <>
      <Navbar />
      <div className='md:contatiner md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2'>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && todo.length > 3) {
                  handleAdd();
                }
              }}
              value={todo}
              type="text"
              className='w-full bg-white rounded-full px-5 py-1'
            />

            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 mx-2 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full disabled:bg-violet-500'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished Todos
        <div className="h-[1px] bg-black opacity-30 w-[90%] mx-auto my-3"></div>
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos ">
          {todos.length === 0 && <div className='m-5 text-gray-500'>No todos added yet!</div>}
          {todos.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between">
              <div className="flex gap-5">

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
                <button onClick={(e) => pinTodo(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>
                  {item.isPinned ? <PiPushPinFill /> : <PiPushPinDuotone />}
                </button>

              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

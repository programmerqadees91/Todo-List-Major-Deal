import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const SaveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const ToggleFinish = (e) => {
    setshowFinished(!showFinished)
  }
  


  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    SaveToLS()
  }

  const handleDelete= (e, id)=>{  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    SaveToLS()
  }
  const handleAdd= ()=>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("") 
    SaveToLS()
  }

  const handleChange= (e)=>{ 
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    SaveToLS()
  }

  return(
  < > 
    <Navbar/>
    <div className=" md:container md:mx-auto bg-gray-900 my-5 m-2 rounded-xl p-5 text-white min-h-[80vh] md:w-1/2">
    <h1 className='font-bold text-center text-xl'> Air Task- Manage Your Todos At One Place</h1>
      <div className="addTodo my-5 flex flex-col gap-3">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <div className="flex">

        <input onChange={handleChange} value={todo} className='text-black rounded-lg w-full px-5 py-1' type="text" />
        <button onClick={handleAdd} disabled={todo.length<=0} className='disabled:bg-slate-800 bg-slate-800 hover:bg-slate-900 p-2 font-bold mx-2 px-4 py-1 rounded-lg '>Save</button>
        </div>
      </div>
      <input className='my-4' onChange={ToggleFinish} type="checkbox" checked={showFinished} name="" id="" /><label htmlFor="" className='mx-2'>Show Finished</label> 
     <div className='h-[2px] rounded-2xl bg-slate-900 opacity-15 w-[90%] mx-auto my-2'></div>
      <h2 className='text-lg font-bold'>Your Todos</h2>
      <div className="todos">
          {todos.length ===0 && <div className='m-5'>No Todos To Display</div> }
        {todos.map(item => {


        return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-slate-800 hover:bg-slate-900 p-2 font-bold mx-1 py-1 rounded-lg'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-slate-800 hover:bg-slate-900 p-2 font-bold mx-1 py-1 rounded-lg'><MdOutlineDeleteForever /></button>
            </div>
          </div>
        })}
      </div>
    </div>
  </>
  )
}

export default App 

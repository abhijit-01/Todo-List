import { useState,useEffect } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    console.log(id);
    let idx = todos.findIndex((item)=>{
      return item.id === id ;
    });
    let newTodos = [...todos];
    newTodos[idx].isCompleted = !newTodos[idx].isCompleted ;
    setTodos(newTodos);
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleDelete = (e,id) => {
    let newTodos = todos.filter((item)=>{
      return item.id !== id ;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <>
      <Navbar />
      <div className="container min-h-[95vh] bg-violet-200 mx-auto my-6 py-3">
        <div className="content mx-12 ">
          <h1 className="text-xl text-black font-bold py-5 text-center">
            <u>Manage All of Your Todo's in one place</u>
          </h1>
          <div className="addTodo py-2 my-5 flex flex-col gap-4">
            <h2 className="text-lg font-bold">Add a Todo :- </h2>
            <input
              onChange={handleChange}
              value={todo}
              className="w-full rounded-full px-5 py-1 text-lg font-mono font-medium"
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 1}
              className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 p-2 py-1 text-sm font-bold text-white rounded-md"
            >
              Save
            </button>
          </div>
          <div className="show flex gap-3">
            <input type="checkbox"
            className="my-4"
            onChange={toggleFinished}
            checked={showFinished}
             />
            <h2 className="my-4 text-lg font-mono font-medium">Show Finished</h2>
          </div>
          <hr className="border-black" />
          <h2 className="text-lg font-bold my-4">Your Todos</h2>
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}

          {todos.map((item)=>{
            return(
              (showFinished || !item.isCompleted) && (
              <div className="todos flex gap-2 my-3 justify-between">  

                <div className="text flex gap-5 text-lg font-mono font-bold">
                  <input type="checkbox" name={item.id}
                  value={todo.isCompleted}
                  onChange={handleCheckbox}
                  checked={item.isCompleted}
                  id=""
                   />
                  <div className={item.isCompleted ? "line-through" : ""} >                  
                  {item.todo}
                  </div>
                </div >
                
                <div className="buttons flex gap-2">
                  <button
                    onClick={(e)=> handleEdit(e,item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md max-h-[50px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e)=> handleDelete(e,item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md max-h-[50px]"
                  >
                    Delete
                  </button>
                </div>
                </div>
              )
            )
          })}
          

        </div>
      </div>
    </>
  );
}

export default App;

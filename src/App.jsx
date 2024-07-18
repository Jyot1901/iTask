import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const togglefinished = () => {
    setShowFinished(!ShowFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS()
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    saveToLS()
  };
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto bg-[#2E2E2E] text-[#ffffff] my-5 p-5 rounded-xl min-h-[80vh] md:w-1/2">
        <h1 className="font-bold text-center text-xl mb-8">iTask - Manage Your To-do here</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-md py-1 text-black font-medium"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-[#27a32b] hover:bg-[#318936] p-2 text-sm font-bold py-1 px-3 text-white rounded-md"
          >
            Save
          </button>
        </div>
        <input className="my-4" onChange={togglefinished} type="checkbox" checked={ShowFinished} /> Show Finished
        <div className="h-[1px] bg-white opacity-15 w-[100%] mx-auto my-2"></div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to Display</div>}
          {todos.map((item) => {
            return ((ShowFinished || !item.iscompleted) &&
              <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    type="checkbox"
                    onChange={handleCheckbox}
                    checked={item.iscompleted}
                  />
                  <div className={item.iscompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="button flex h-full">
                  <button
                    onClick={(e) => { handleEdit(e, item.id) }}
                    className="bg-blue-600 hover:bg-blue-800 p-2 text-sm font-bold py-1 px-4 text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => { handleDelete(e, item.id) }}
                    className="bg-[#F44336] hover:bg-[#a5261d] p-2 text-sm font-bold py-1 px-4 text-white rounded-md mx-1"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

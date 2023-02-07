import { useEffect, useState } from "react";
import "./App.css";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./services/todo.service";

const App = () => {
  const [taskName, setTaskName] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const { data } = await getTodos();
      setTodoList(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async () => {
    if (!taskName) {
      return;
    }
    if (isEdit) {
      try {
        await updateTodo({
          id: todo.id,
          task: taskName,
          isComplete: todo.complete,
        });

        setTodoList((prev) => [
          ...prev,
          {
            id: todo.id,
            task: taskName,
            complete: todo.complete,
          },
        ]);
        setIsEdit(false)
      } catch (error) {}
    } else {
      try {
        const id = todoList.length + 1;
        await addTodo({
          id: id,
          task: taskName,
          isComplete: false,
        });
        setTodoList((prev) => [
          ...prev,
          {
            id: id,
            task: taskName,
            complete: false,
          },
        ]);
      } catch (error) {}
    }

    setTaskName("");
  };

  
  const handleComplete = (id) => {
    let list = todoList.map(async (task) => {
      let item = {};
      if (task.id === id) {
        if (!task.complete) {
          //Task is pending, modifying it to complete and increment the count
          setCompletedTaskCount(completedTaskCount + 1);
        } else {
          //Task is complete, modifying it back to pending, decrement Complete count
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = { ...task, complete: !task.complete };
        await update(task);
      } else item = { ...task };
      return item;
    });

    setTodoList(list);
  };

  const handleEdit = (todo) => {
    setIsEdit(true);
    setEditTodo(todo);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Todo List</h2>
        <input value={taskName} onInput={(e) => setTaskName(e.target.value)} />
        <button onClick={() => handleClick()}>
          {isEdit ? "Update Task" : "Add Task"}
        </button>
        <div>
          <span>
            <b>Pending Tasks</b> {todoList.length - completedTaskCount}
          </span>
          <span>
            <b>Completed Tasks</b> {completedTaskCount}
          </span>
        </div>
        <div>
          <ol>
            {todoList.map((todo) => {
              return (
                <li
                  id={todo.id}
                  style={{
                    listStyle: "none",
                    textDecoration: todo.complete && "line-through",
                  }}
                >
                  <input
                    type="checkbox"
                    onChange={() => handleComplete(todo.id)}
                    checked={todo.complete}
                  />
                  {todo.task}
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                  <button onClick={() => handleEdit(todo.id)}>Delete</button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
export default App;

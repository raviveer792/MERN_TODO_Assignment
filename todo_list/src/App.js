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

  useEffect(() => {
    // fetchTodos();
    setCompletedTaskCount(todoList.filter((todo) => todo.isCompleted).length);
  }, [todoList]);

  async function fetchTodos() {
    try {
      const { data } = await getTodos();
      setCompletedTaskCount(
        data.data.filter((todo) => todo.isCompleted).length
      );
      setTodoList(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = async () => {
    if (!taskName) {
      return;
    }
    if (isEdit) {
      await update({
        id: editTodo.id,
        task: taskName,
        isCompleted: editTodo.isCompleted,
      });
      fetchTodos();
      setIsEdit(false);
    } else {
      try {
        const id = todoList.length + 1;
        await addTodo({
          id: id,
          task: taskName,
          isCompleted: false,
        });
        setTodoList((prev) => [
          ...prev,
          {
            id: id,
            task: taskName,
            isCompleted: false,
          },
        ]);
      } catch (error) {}
    }

    setTaskName("");
  };

  const update = async (todo) => {
    try {
      await updateTodo({
        id: todo.id,
        task: todo.task,
        isCompleted: todo.isCompleted,
      });

      // await fetchTodos();
    } catch (error) {}
  };

  const handleComplete = async (id) => {
    let item = {};
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id == id) {
          item = { ...todo, isCompleted: !todo.isCompleted };
          return item;
        }
        return todo;
      });
    });
    await update(item);
  };

  const handleEdit = (todo) => {
    setIsEdit(true);
    setEditTodo(todo);
    setTaskName(todo.task);
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
        <h2> Todo List </h2>{" "}
        <input value={taskName} onInput={(e) => setTaskName(e.target.value)} />{" "}
        <button onClick={() => handleClick()}>
          {" "}
          {isEdit ? "Update Task" : "Add Task"}{" "}
        </button>{" "}
       { todoList.length > 0  &&  <div style={{marginTop:'10px'}}>
          <span>
            <b> Pending Tasks </b> {todoList.length - completedTaskCount}
          </span>{" "}
          <span>
            <b> Completed Tasks </b> {completedTaskCount}
          </span>
        </div>}
        <div>
          <ol>
            {" "}
            {todoList.map((todo) => {
              return (
                <li
                  id={todo.id}
                  key={todo._id}
                  style={{
                    listStyle: "none",
                    marginTop: "10px",
                  }}
                >
                  <input
                    style={{ width: "16px" }}
                    type="checkbox"
                    onChange={() => handleComplete(todo.id)}
                    checked={todo.isCompleted}
                  />{" "}
                  <span
                    style={{
                      listStyle: "none",
                      textDecoration: todo.isCompleted && "line-through",
                    }}
                  >  {todo.task}{" "}
                  </span>
                  <button onClick={() => handleEdit(todo)}> Edit </button>{" "}
                  <button onClick={() => handleDelete(todo.id)}>
                    {" "}
                    Delete{" "}
                  </button>{" "}
                </li>
              );
            })}{" "}
          </ol>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default App;

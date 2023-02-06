import { useState } from "react";
import "./App.css";

const App = () => {
  const [taskName, setTaskName] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);

  const handleClick = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: taskName,
        complete: false,
      },
    ]);
    setTaskName("");
  };

  const handleComplete = (id) => {
    let list = todoList.map((task) => {
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
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  return (
    <div>
      <div>
        <h2>Todo List</h2>
        <input value={taskName} onInput={(e) => setTaskName(e.target.value)} />
        <button onClick={() => handleClick()}>Add</button>
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
                  <input type="checkbox"    onChange={() => handleComplete(todo.id)} checked={todo.complete}/>
                  {todo.task}
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAPI } from "../api";

const API_BASE_URL = "https://crudapi.co.uk/api/v1/todo";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await fetchAPI(API_BASE_URL);
    if (data) setTasks(data.results || []);
  };

  const deleteTask = async (id) => {
    await fetchAPI(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleCompletion = async (task) => {
    await fetchAPI(`${API_BASE_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, isCompleted: !task.isCompleted }),
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Task List</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} style={{ marginBottom: "10px" }}>
            <span
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleCompletion(task)}
            >
              {task.name} - {task.deadline} - {task.assignee}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
            <Link to={`/edit/${task.id}`} style={{ marginLeft: "10px" }}>
              Edit
            </Link>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
}

export default TaskList;

import { useEffect, useState } from "react";

const API_BASE_URL = "https://crudapi.co.uk/api/v1/todo";
const API_KEY = "Z0XRJ7g-w938e-3sB6qG0urq6SFShS24QRuYkEnVlpuLXbwqnw"; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data); 
      setTasks(data.results || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    }
  };

  const addTask = async () => {
    if (!taskName.trim()) return;
    await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: taskName, isCompleted: false }),
    });
    setTaskName("");
    fetchTasks();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{display: "flex", justifyContent:"center", alignItems:"center", 
     flexDirection:"column", margin: "20px", fontFamily: "Arial, sans-serif", gap:"10px", }}>
      <h1>TODO App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <h2>Task List</h2>
      <div>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id}>
              <span>{task.name}</span>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default App;

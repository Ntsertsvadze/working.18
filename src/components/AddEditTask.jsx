import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../api";

const API_BASE_URL = "https://crudapi.co.uk/api/v1/todo";

function AddEditTask() {
  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignee, setAssignee] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchTask = async () => {
    if (id) {
      const task = await fetchAPI(`${API_BASE_URL}/${id}`);
      if (task) {
        setTaskName(task.name);
        setDeadline(task.deadline);
        setAssignee(task.assignee);
        setDetails(task.details);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { name: taskName, deadline, assignee, details, isCompleted: false };

    if (id) {
      await fetchAPI(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
    } else {
      await fetchAPI(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });
    }

    navigate("/");
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  return (
    <div style={{ textAlign: "center"}}>
      <h1>{id ? "Edit Task" : "Add Task"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left", gap: "20px" }}>
        <div>
          <input
            type="text"
            placeholder="Task Name:"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Deadline:"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Assignee:"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            value={details}
            placeholder="Details:"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button type="submit">{id ? "Update" : "Add"} Task</button>
      </form>
    </div>
  );
}

export default AddEditTask;

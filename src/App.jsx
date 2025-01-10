import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddEditTask from "./components/AddEditTask";

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px", gap: "20px"}}>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add Task</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddEditTask />} />
          <Route path="/edit/:id" element={<AddEditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

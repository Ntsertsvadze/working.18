import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import AddEditTask from "./components/AddEditTask";
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", margin: "20px", gap: "20px"}}>
        <nav style={{backgroundColor: "gold", display: "flex", justifyContent: "center", padding: "20px", gap: "20px"}}>
          <Link to="/" >Home</Link> | <Link to="/add">Add Task</Link>
        </nav>
        <LanguageProvider>
            <Header />
              <main style={{ padding: '20px' }}>
              </main>
        </LanguageProvider>
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






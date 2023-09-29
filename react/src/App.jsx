import { Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import TaskForm from "./pages/TaskForm";

function App() {
  return (<>
    <Routes>
      <Route exact path="/" element={<Tasks />} />
      <Route exact path="/task/save" element={<TaskForm />} />
    </Routes>
  </>);
}

export default App

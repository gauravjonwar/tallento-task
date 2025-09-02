import { Routes, Route } from "react-router-dom";
import Task1 from "../src/componenes/Task1.jsx";
import Calender from "../src/componenes/Calender.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Task1 />} />
        <Route path="/Calender" element={<Calender />} />
      </Routes>
    </>
  );
}

export default App;

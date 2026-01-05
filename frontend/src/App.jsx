import { BrowserRouter, Routes, Route } from "react-router-dom";
import Staff from "./pages/Staff";
import StaffForm from "./pages/StaffForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Staff />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/add" element={<StaffForm />} />
        <Route path="/staff/edit/:id" element={<StaffForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

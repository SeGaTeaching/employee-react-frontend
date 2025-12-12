import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeeFormPage from "./pages/EmployeeFormPage";
import EmployeePage from "./pages/EmployeePage";
import Header from "./pages/partials/Header";
import "./App.css"; // Unser globales Styling

function App() {
  return (
    <>
      <Header />

      <div className="appContainer">
        <h1 className="mainTitle">Unser Team</h1>

          <Routes>
            {/* 1. Die Liste */}
            <Route path="/" element={<HomePage />} />

            {/* 2. Employee */}
            <Route path="/employees/:id" element={<EmployeePage />} />

            {/* 3. Neu anlegen */}
            <Route path="/employees/new" element={<EmployeeFormPage />} />

            {/* 4. Bearbeiten (mit dynamischer ID) */}
            <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
          </Routes>
      </div>
    </>
  );
}

export default App;

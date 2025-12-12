import { Link, useNavigate } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployees";
import EmployeeCard from "../components/EmployeeCard";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { employees, actions } = useEmployees();
  const navigate = useNavigate();

  return (
    <div className={styles.grid}>
      {employees.map((ma) => (
        <EmployeeCard
          key={ma.id}
          // Spread-Operator: Übergibt id, name, role, isActive, imageUrl automatisch
          {...ma}
          onDelete={actions.remove}
          onEdit={(id) => navigate(`/employees/${id}/edit`)}
          onClick={(id) => navigate(`/employees/${id}`)}
        />
      ))}
    </div>
  );
}

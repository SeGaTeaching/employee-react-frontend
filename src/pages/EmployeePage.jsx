import { useParams } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import { useEmployee } from "../hooks/useEmployee";
import { useEmployees } from '../hooks/useEmployees';
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function EmployeePage() {
  const { id } = useParams(); // Holt die ID aus der URL (z.B. /edit/5)
  const { employee } = useEmployee(id);
  const { actions } = useEmployees();
  const navigate = useNavigate();

  
  return (
    <div className={styles.grid}>

        <EmployeeCard
          key={id}
          // Spread-Operator: Übergibt id, name, role, isActive, imageUrl automatisch
          {...employee}
          onDelete={actions.remove}
          onEdit={(id) => navigate(`/employees/${id}/edit`)}
          isDetail={true}
        />

    </div>
  );
}

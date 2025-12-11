import EmployeeCard from "./EmployeeCard";
import styles from "./EmployeeList.module.css";

export default function EmployeeList({ employees, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <p style={{ textAlign: 'center' }}>Keine Mitarbeiter gefunden.</p>;
  }

  return (
    <div className={styles.grid}>
      {employees.map((ma) => (
        <EmployeeCard
          key={ma.id}
          // Spread-Operator: Übergibt id, name, role, isActive, imageUrl automatisch
          {...ma} 
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
import { useState, useEffect } from "react";
import styles from "./EmployeeForm.module.css";

export default function EmployeeForm({
  onAdd,
  editingEmployee,
  onUpdate,
  onCancel
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setRole(editingEmployee.role);
    } else {
      setName("");
      setRole("");
    }
  }, [editingEmployee]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !role) return;

    if (editingEmployee) {
      // UPDATE MODUS
      onUpdate({
        ...editingEmployee,
        name: name,
        role: role
      });
    } else {
      // CREATE MODUS
      onAdd({
        name: name,
        role: role,
        isActive: true,
        imageUrl: `https://i.pravatar.cc/150?u=${name}` // Zufallsbild
      });
    }

    if (!editingEmployee) {
      setName("");
      setRole("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formCard}>
      <h3 className={styles.formTitle}>
        {editingEmployee
          ? "Mitarbeiter bearbeiten"
          : "Neuen Mitarbeiter anlegen"}
      </h3>

      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Rolle (z.B. IT)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        
        <div className={styles.buttonGroup}>
            <button className={styles.button} type="submit">
            {editingEmployee ? "Speichern" : "Hinzufügen"}
            </button>

            {/* Abbrechen-Button nur im Edit-Modus zeigen */}
            {editingEmployee && (
            <button
                type="button"
                onClick={onCancel}
                className={styles.cancelButton}
            >
                Abbrechen
            </button>
            )}
        </div>
      </div>
    </form>
  );
}
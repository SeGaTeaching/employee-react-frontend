import { useState, useEffect } from 'react';
import { getEmployeeById, createEmployee, updateEmployee } from '../services/employeeService';
import { useNavigate } from 'react-router-dom';

export function useEmployee(id) {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Um nach dem Speichern wegzuleiten

  // Wenn eine ID da ist (Edit Mode), laden wir die Daten
  useEffect(() => {
    if (id) {
      setLoading(true);
      getEmployeeById(id)
        .then(data => setEmployee(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function save(data) {
    if (id) {
      // Update
      await updateEmployee(id, data);
    } else {
      // Create
      await createEmployee(data);
    }
    navigate('/'); // Zurück zur Liste
  }

  return { employee, loading, save };
}
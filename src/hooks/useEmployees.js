// src/hooks/useEmployees.js
import { useState, useEffect } from 'react';
import { 
  getAllEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '../services/employeeService';

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Daten laden
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // 2. Erstellen
  async function add(employeeData) {
    try {
      const newEmployee = await createEmployee(employeeData);
      // Optimistisch: Wir fügen das Ergebnis direkt hinzu ohne Neuladen
      setEmployees(prev => [newEmployee, ...prev]);
    } catch (err) {
      console.error("Fehler beim Erstellen:", err);
      setError("Konnte nicht gespeichert werden.");
    }
  }

  // 3. Aktualisieren
  async function update(updatedData) {
    try {
      const result = await updateEmployee(updatedData.id, updatedData);
      setEmployees(prev => prev.map(emp => 
        emp.id === result.id ? result : emp
      ));
      setEditingEmployee(null); // Formular schließen/leeren
    } catch (err) {
      console.error("Fehler beim Update:", err);
    }
  }

  // 4. Löschen
  async function remove(id) {
    if (!confirm("Möchtest du diesen Mitarbeiter wirklich löschen?")) return;
    
    try {
      await deleteEmployee(id);
      // Wir filtern lokal, das spart einen Netzwerk-Call um die ganze Liste neu zu laden
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      
      // Falls wir den gerade bearbeiten, Editor schließen
      if (editingEmployee && editingEmployee.id === id) {
        setEditingEmployee(null);
      }
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  }

  // 5. Editor Vorbereiten
  function startEditing(id) {
    const employeeToEdit = employees.find(e => e.id === id);
    setEditingEmployee(employeeToEdit);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEditing() {
    setEditingEmployee(null);
  }

  // Wir geben nur zurück, was die UI braucht
  return {
    employees,
    editingEmployee,
    isLoading,
    error,
    actions: {
      add,
      update,
      remove,
      startEditing,
      cancelEditing
    }
  };
}
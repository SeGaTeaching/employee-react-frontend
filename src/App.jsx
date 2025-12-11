import { useEmployees } from './hooks/useEmployees';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import './App.css'; // WICHTIG: Hier importieren wir das CSS von oben

function App() {
  const { 
    employees, 
    editingEmployee, 
    isLoading, 
    error,
    actions 
  } = useEmployees();

  return (
    // Hier nutzen wir jetzt die Klasse aus App.css
    <div className="appContainer"> 
      <h1 className="mainTitle">Unser Team</h1>

      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      
      <EmployeeForm 
        onAdd={actions.add}
        onUpdate={actions.update}
        editingEmployee={editingEmployee}
        onCancel={actions.cancelEditing}
      />

      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Lade Daten...</p>
      ) : (
        <EmployeeList 
          employees={employees}
          onEdit={actions.startEditing}
          onDelete={actions.remove}
        />
      )}
    </div>
  );
}

export default App;
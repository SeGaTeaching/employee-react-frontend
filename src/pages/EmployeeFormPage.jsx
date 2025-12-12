import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../hooks/useEmployee';
import EmployeeForm from '../components/EmployeeForm';

export default function EmployeeFormPage() {
  const { id } = useParams(); // Holt die ID aus der URL (z.B. /edit/5)
  const navigate = useNavigate();
  
  // Unser neuer Hook kümmert sich um das Laden (falls ID da ist) und Speichern
  const { employee, loading, save } = useEmployee(id);

  if (loading) return <p>Lade...</p>;

  return (
    <div>

      <EmployeeForm 
        // Wenn employee da ist, sind wir im Edit-Modus, sonst Create
        editingEmployee={employee} 
        
        // Wir vereinheitlichen Add/Update zu einer Funktion im Hook
        onAdd={save} 
        onUpdate={save}
        
        onCancel={() => navigate('/')}
      />
    </div>
  );
}
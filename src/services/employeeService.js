// src/services/employeeService.js

const API_BASE_URL = "http://127.0.0.1:8000/employees";

// Hilfsfunktion für Fehlerbehandlung
async function handleResponse(response) {
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  // Wenn der Response keinen Content hat (z.B. bei DELETE), gib null zurück
  if (response.status === 204) return null; 
  return response.json();
}

export async function getAllEmployees() {
  const response = await fetch(API_BASE_URL);
  return handleResponse(response);
}

export async function createEmployee(data) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function updateEmployee(id, data) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function deleteEmployee(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, { 
    method: 'DELETE' 
  });
  return handleResponse(response);
}
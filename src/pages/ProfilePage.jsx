import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { email, token } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchTodoStats() {
      try {
        const response = await fetch("/api/tasks?limit=100", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch todos: ${response.status}`);
        }

        const data = await response.json();
        const todos = data.tasks;

        const completed = todos.filter((todo) => todo.isCompleted).length;
        const total = todos.length;
        const active = total - completed;
        
        setStats({ total, completed, active });
      } catch (error) {
        setError(error.message);
      }
    }
    if (token) {
      fetchTodoStats();
    }
  }, [token]);

  return (
    <main>
      <h1>Profile</h1>

      <section>
        <h2>User Information</h2> <p>Name: {email}</p>
        <p>Token: {token ? "Authenticated" : "Not authenticated"}</p>
      </section>

      <section>
        <h2>Todo Statistics</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <>
            <p>Total todos: {stats.total}</p>
            <p>Completed: {stats.completed}</p>
            <p>Active: {stats.active}</p>
          </>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;

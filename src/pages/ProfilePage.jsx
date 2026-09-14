import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { email, token } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };

        const response = await fetch("/api/tasks?limit=100", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch todos: ${response.status}`);
        }

        const data = await response.json();
        const todos = data.tasks;

        const completed = todos.filter((todo) => todo.isCompleted).length;
        const total = todos.length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch (error) {
        setError(`Error loading statistics: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  return (
    <main>
      <h1>Profile</h1>

      <section>
        <h2>User Profile</h2>
        <h3>Account Information</h3>
        <p>Name: {email}</p>
        <p>Token: {token ? "Authenticated" : "Not authenticated"}</p>
      </section>

      <section>
        <h3>Todo Statistics</h3>
        {loading && <p>Loading statistics...</p>} 
        {error && <p>{error}</p>}
        {!loading && !error && (
          <>
            
            <p>Total todos: {todoStats.total}</p>
            <p>Completed: {todoStats.completed}</p>
            <p>Active: {todoStats.active}</p>
            {todoStats.total > 0 && <p>Completion: {completionPercentage}%</p>}
          </>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;

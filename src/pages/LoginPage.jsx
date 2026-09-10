import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get intended destination from location state, default to /todos
  const from = location.state?.from?.pathname || "/todos";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const [authError, setAuthError] = useState("");

  // Handle login form submission
  async function handleSubmit(event) {
    event.preventDefault();
    setAuthError("");
    setIsLoggingOn(true);
    
    try {
       const result = await login(email, password);

        if (!result.success) {
            setAuthError(result.error);
        }  
    } catch (error) {
        setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
        setIsLoggingOn(false);
    }   
  }

  return (
    <form onSubmit={handleSubmit}>
      {authError && (
        <section>
          <p>{authError}</p>
        </section>
      )}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {isLoggingOn && <p>Processing...</p>}
      
      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging in..." : "Log On"}
      </button>
    </form>
  );
}

export default LoginPage;

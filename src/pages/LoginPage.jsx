import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/useAuth";

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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle login form submission
  async function handleSubmit(event) {
    event.preventDefault();

    setAuthError("");
    setEmailError("");
    setPasswordError("");

    let hasValidationError = false;

    if (!email.trim()) {
      setEmailError("Email is required.");
      hasValidationError = true;
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      hasValidationError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      hasValidationError = true;
    }

    if (hasValidationError) {
      return;
    }

    setIsLoggingOn(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setAuthError("Unable to login. Please check your credentials.");
      }
    } catch {
      setAuthError("Something went wrong. Please try logging in again.");
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="login-form">
      {authError && (
        <section>
          <p role="alert">{authError}</p>
        </section>
      )}

      <div className="login-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError("");
          }}
          required
          maxLength={254}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && (
          <p id="email-error" role="alert">
            {emailError}
          </p>
        )}
      </div>

      <div className="login-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setPasswordError("");
          }}
          required
          maxLength={128}
          aria-describedby={passwordError ? "password-error" : undefined}
        />
        {passwordError && (
          <p id="password-error" role="alert">
            {passwordError}
          </p>
        )}
      </div>
      {isLoggingOn && <p>Processing...</p>}

      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging in..." : "Log On"}
      </button>
    </form>
  );
}

export default LoginPage;

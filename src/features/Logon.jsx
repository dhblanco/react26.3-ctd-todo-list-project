import { useState } from "react";
import { useAuth } from '../contexts/AuthContext';

function Logon() {
    const { login } = useAuth();

    //set up authentication state

    //  controlled form inputs
    const [email, setEmail] = useState("");

    //  to display login failure
    const [password, setPassword] = useState("");

    //  to show loading state during logon
    const [isLoggingOn, setIsLoggingOn] = useState(false);

    // to show error messages as needed
    const [authError, setAuthError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAuthError('');
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
    };
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
            {isLoggingOn && (
                <p>Processing...</p>
            )}
            <button
                type="submit"
                disabled={isLoggingOn}
            >
                {isLoggingOn ? "Logging in..." : "Log On"}
            </button>
        </form>
    )
}

export default Logon;
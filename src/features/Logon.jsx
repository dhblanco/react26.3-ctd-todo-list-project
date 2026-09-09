import { useState } from "react";
import { useAuth } from '../contexts/AuthContext';
import LoginPage from "../pages/LoginPage";

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
        <>
            <LoginPage />
        </>
    )
}

export default Logon;
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logoff() {

    const { logout } = useAuth();
    const [ logoffError, setLogoffError ] = useState('');

    const handleLogoff = async () => {
        const result = await logout();

        if (!result.success) {
            setLogoffError(result.error);
        }
    };

    return (
        <>
            {logoffError && <p>{logoffError}</p>}
            
            <button onClick={handleLogoff}>
                Log Off
            </button>
        </> 
    );
}

export default Logoff;
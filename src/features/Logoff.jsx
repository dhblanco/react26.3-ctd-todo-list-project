import { useAuth } from "../contexts/AuthContext";

function Logoff() {

    const { logout, logoffError } = useAuth();

    const handleLogoff = async () => {
        await logout();
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
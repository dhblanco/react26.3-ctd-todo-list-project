import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

function Logoff() {

    const { logout, logoffError } = useAuth();
    const navigate = useNavigate();

    const handleLogoff = async () => {
        const result = await logout();

        if (result.success) {
            navigate('/login');
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
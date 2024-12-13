import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticateUser = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      navigate("/frontPage");
    }, [navigate]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center h-screen">
            Loading...
        </div>
    );
}

export default AuthenticateUser;
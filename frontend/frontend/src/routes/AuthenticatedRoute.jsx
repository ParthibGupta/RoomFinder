import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if(isAuthenticated)
        return children;
    else
        loginWithRedirect()
};

export default AuthenticatedRoute;

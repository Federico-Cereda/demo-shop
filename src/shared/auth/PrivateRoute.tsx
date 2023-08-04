import { PropsWithChildren } from "react";
import { useAuth } from "../../services/auth/useAuth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    else?: React.ReactNode
}

export function PrivateRoute(props: PropsWithChildren<PrivateRouteProps>) {
    const isLogged = useAuth(state => state.isLogged)
    return <>
        {isLogged ? props.children : <Navigate to='/login' />}
    </>
}

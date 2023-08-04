import { PropsWithChildren } from "react";
import { useAuth } from "../../services/auth/useAuth";

interface IfLoggedProps {
    else?: React.ReactNode
}

export function IfLogged(props: PropsWithChildren<IfLoggedProps>) {
    const isLogged = useAuth(state => state.isLogged)
    return <>
        {isLogged ? props.children : props.else}
    </>
}
